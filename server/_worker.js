/**
 * _worker.js — erikg.org unified Worker
 *
 * Routing by hostname:
 *   erikg.org, www.erikg.org   → serve /public/
 *   ai.erikg.org                → serve /public/ai/ + handle /api/*
 *   *.erikg.org                 → serve /<subdomain>/
 *
 * API (ai.erikg.org/api/*):
 *   All write endpoints require: Authorization: Bearer <API_TOKEN>
 *
 *   GET  /api/ping
 *
 *   Pages (committed to GitHub → auto-redeploy):
 *   GET  /api/pages              → list pages in public/ai/ dir
 *   GET  /api/pages/:slug        → read page from file storage / Github
 *   PUT  /api/pages/:slug        → commit page to GitHub
 *   DEL  /api/pages/:slug        → delete page from GitHub
 *
 *   Data (stored in KV, fast state):
 *   GET  /api/data/:col          → read JSON collection
 *   POST /api/data/:col          → write JSON collection
 *   DEL  /api/data/:col          → delete collection
 */

const GITHUB_REPO = "errgrab/erikg-cloudflare";
const GITHUB_BRANCH = "main";
const PAGES_DIR = "public/ai";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname;

    // CORS preflight
    if (request.method === "OPTIONS") {
      return cors(new Response(null, { status: 204 }));
    }

    // Determine subdomain
    const subdomain = host.replace(/\.?erikg\.org$/, "") || "root";
    const isRoot = subdomain === "root" || subdomain === "www";
    const isAi = subdomain === "ai";

    // API routes (ai subdomain only)
    if (isAi && url.pathname.startsWith("/api/")) {
      return cors(await handleAPI(request, env, url));
    }

    // Serve index UI for ai subdomain
    if (isAi && (url.pathname === "/" || url.pathname === "/index")) {
      return serveIndex(env, url);
    }

    // Static file serving via env.ASSETS (Cloudflare Pages/Workers)
    // Map subdomain → directory prefix
    const dir = isRoot ? "" : subdomain + "/";
    let filePath = dir + (url.pathname === "/" ? "index.html" : url.pathname.replace(/^\//, ""));

    // Prevent double slashing
    filePath = filePath.replace(/\/+/g, "/");

    try {
      // Create request for assets
      const assetUrl = new URL("/" + filePath, request.url);
      let asset = await env.ASSETS.fetch(new Request(assetUrl, request));
      
      if (asset.status === 404 && url.pathname !== "/") {
        // Try fallback index.html mapping (e.g. /about -> /about/index.html)
        const fallback = await env.ASSETS.fetch(new Request(new URL("/" + dir + "index.html", request.url), request));
        if (fallback.status === 200) {
          return fallback;
        }
      }
      return asset;
    } catch {
      return new Response("Not found", { status: 404 });
    }
  }
};

// ── API ────────────────────────────────────────────────────────────────────

async function handleAPI(request, env, url) {
  const path = url.pathname.replace("/api", "");
  const method = request.method;

  // Public: ping
  if (path === "/ping") {
    return json({ ok: true, ts: new Date().toISOString() });
  }

  // Auth required for everything else
  const token = (request.headers.get("Authorization") || "").replace("Bearer ", "").trim();
  if (token !== env.API_TOKEN) return err(401, "Unauthorized");

  // ── Pages (GitHub-backed) ───────────────────────────────────────────────

  if (path === "/pages" && method === "GET") {
    const files = await ghList(env, PAGES_DIR);
    const pages = files
      .filter(f => f.name.endsWith(".html") && f.name !== "index.html")
      .map(f => f.name.replace(".html", ""));
    return json({ pages });
  }

  const pageMatch = path.match(/^\/pages\/([a-z0-9_-]+)$/);
  if (pageMatch) {
    const slug = pageMatch[1];
    const filePath = `${PAGES_DIR}/${slug}.html`;

    if (method === "GET") {
      try {
        const { content } = await ghRead(env, filePath);
        return json({ slug, html: content });
      } catch (e) {
        return err(404, "Page not found");
      }
    }

    if (method === "PUT") {
      let body;
      try {
        body = await request.json();
      } catch {
        return err(400, "Invalid JSON");
      }
      
      if (!body.html) return err(400, "Missing html");
      
      const message = body.message || `ai: update ${slug}`;
      await ghWrite(env, filePath, body.html, message);

      // Keep pagemeta for the index page speed
      if (env.KV) {
        await env.KV.put(`pagemeta:${slug}`, JSON.stringify({
          title: body.title || slug,
          updatedAt: new Date().toISOString(),
        }));
      }

      return json({ ok: true, slug, action: "committed" });
    }

    if (method === "DELETE") {
      const message = `ai: delete ${slug}`;
      await ghDelete(env, filePath, message);
      if (env.KV) {
        await env.KV.delete(`pagemeta:${slug}`);
      }
      return json({ ok: true, slug, action: "deleted" });
    }
  }

  // ── Data (KV-backed) ───────────────────────────────────────────────────

  const dataMatch = path.match(/^\/data\/([a-z0-9_-]+)$/);
  if (dataMatch) {
    const col = dataMatch[1];
    const key = `data:${col}`;

    if (method === "GET") {
      const data = await env.KV.get(key, "json");
      return json({ collection: col, data: data ?? null });
    }
    if (method === "POST") {
      const body = await request.json();
      await env.KV.put(key, JSON.stringify(body));
      return json({ ok: true, collection: col });
    }
    if (method === "DELETE") {
      await env.KV.delete(key);
      return json({ ok: true, collection: col, action: "deleted" });
    }
  }

  return err(404, "Unknown route");
}

// ── Index Page ─────────────────────────────────────────────────────────────

async function serveIndex(env, url) {
  // We recreate the old index view fetching metadata from KV
  let pagesList = [];
  if (env.KV) {
    const list = await env.KV.list({ prefix: 'pagemeta:' });
    pagesList = await Promise.all(
      list.keys.map(async k => {
        const slug = k.name.replace('pagemeta:', '');
        const meta = await env.KV.get(`pagemeta:${slug}`, 'json') || {};
        return { slug, title: meta.title || slug, updatedAt: meta.updatedAt || '' };
      })
    );
  }

  const INDEX_STYLE = `
    :root {
      --bg: #0e0e0e; --fg: #e8e0d0; --dim: #6b6560;
      --acc: #c8922a; --border: #1e1e1e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg); color: var(--fg);
      font-family: 'DM Mono', monospace; padding: 3rem 2rem;
      max-width: 640px; margin: 0 auto;
    }
    header { margin-bottom: 3rem; }
    h1 { font-size: 1rem; font-weight: 300; color: var(--acc); letter-spacing: 0.1em; }
    p.sub { color: var(--dim); font-size: 0.8rem; margin-top: 0.4rem; }
    ul { list-style: none; }
    li { border-top: 1px solid var(--border); }
    li a {
      display: flex; align-items: center; gap: 1rem;
      padding: 0.9rem 0; text-decoration: none; color: var(--fg);
      font-size: 0.875rem; transition: color 0.15s;
    }
    li a:hover { color: var(--acc); }
    li a .arrow { color: var(--dim); }
    li a .title { flex: 1; }
    li a .date { color: var(--dim); font-size: 0.75rem; }
    .empty { color: var(--dim); font-size: 0.875rem; padding-top: 2rem; }
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
  `;

  const escapeHtml = (s) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  const items = pagesList.length === 0
    ? `<p class="empty">No pages yet. Ask your AI to create one (saving to GitHub!).</p>`
    : `<ul>${pagesList.map(p => `
        <li>
          <a href="/${p.slug}.html">
            <span class="arrow">→</span>
            <span class="title">${escapeHtml(p.title)}</span>
            <span class="date">${p.updatedAt ? p.updatedAt.slice(0, 10) : ''}</span>
          </a>
        </li>`).join('')}
      </ul>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ai.erikg.org</title>
  <style>${INDEX_STYLE}</style>
</head>
<body>
  <header>
    <h1>ai.erikg.org</h1>
    <p class="sub">Pages created and managed by AI.</p>
  </header>
  ${items}
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}

// ── GitHub helpers ─────────────────────────────────────────────────────────

const GH = `https://api.github.com/repos/${GITHUB_REPO}`;

function ghHeaders(env) {
  return {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "erikg-worker",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function ghList(env, dir) {
  const r = await fetch(`${GH}/contents/${dir}?ref=${GITHUB_BRANCH}`, {
    headers: ghHeaders(env),
  });
  if (!r.ok) return [];
  return r.json();
}

async function ghRead(env, path) {
  const r = await fetch(`${GH}/contents/${path}?ref=${GITHUB_BRANCH}`, {
    headers: ghHeaders(env),
  });
  if (!r.ok) throw new Error(`GitHub 404: ${path}`);
  const j = await r.json();
  const base64str = j.content.replace(/\n| /g, "");
  
  // Use atob safely for UTF-8 via escape/decodeURIComponent
  const raw = atob(base64str);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    bytes[i] = raw.charCodeAt(i);
  }
  const content = new TextDecoder().decode(bytes);

  return { content, sha: j.sha };
}

async function ghWrite(env, path, content, message) {
  // Get existing SHA if file exists (needed for updates)
  let sha;
  try {
    const existing = await ghRead(env, path);
    sha = existing.sha;
  } catch { /* new file */ }

  const bytes = new TextEncoder().encode(content);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const encodedContent = btoa(binary);

  const body = {
    message,
    content: encodedContent,
    branch: GITHUB_BRANCH,
    ...(sha ? { sha } : {}),
  };

  const r = await fetch(`${GH}/contents/${path}`, {
    method: "PUT",
    headers: { ...ghHeaders(env), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    const e = await r.text();
    throw new Error(`GitHub write failed: ${e}`);
  }
  return r.json();
}

async function ghDelete(env, path, message) {
  let sha;
  try {
    const existing = await ghRead(env, path);
    sha = existing.sha;
  } catch {
    return; // already gone
  }

  const r = await fetch(`${GH}/contents/${path}`, {
    method: "DELETE",
    headers: { ...ghHeaders(env), "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch: GITHUB_BRANCH }),
  });

  if (!r.ok) throw new Error("GitHub delete failed");
}

// ── Response helpers ───────────────────────────────────────────────────────

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function cors(response) {
  const r = new Response(response.body, response);
  Object.entries(CORS).forEach(([k, v]) => r.headers.set(k, v));
  return r;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function err(status, message) {
  return json({ error: message }, status);
}
