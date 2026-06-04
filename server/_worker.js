export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "index.html" : url.pathname.replace(/^\//, "");
    const candidate = pathname.replace(/\/+/g, "/");

    const asset = await fetchAsset(env, candidate);
    if (asset) return asset;

    const fallback = await fetchAsset(env, "index.html");
    if (fallback) return fallback;

    return new Response("Not found", { status: 404 });
  },
}

async function fetchAsset(env, path) {
  try {
    const assetUrl = new URL(`/${path}`, "http://assets.internal");
    const response = await env.ASSETS.fetch(new Request(assetUrl.toString()));
    return response.status === 404 ? null : response;
  } catch {
    return null;
  }
}
