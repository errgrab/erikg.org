# erikg-cloudflare

Unified Cloudflare Worker powering the entire **erikg.org** domain.

## Architecture

```
erikg.org, www.erikg.org   →  dist/index.html  (main portfolio site)
ai.erikg.org               →  public/ai/        (AI-managed pages)
  ai.erikg.org/api/*       →  Worker API        (authenticated)
*.erikg.org                →  public/<subdomain>/
```

One repository. One deployment. All subdomains managed here.

## How AI Pages Work

Your AI assistant talks to the `ai.erikg.org/api/*` REST API using a Bearer token. Instead of storing pages in a database, the Worker commits HTML files directly to `public/ai/` in this repo via the GitHub API. Every AI-created page becomes a real, version-controlled file.

```
AI sends:  PUT ai.erikg.org/api/pages/hello  { html: "..." }
Worker:    commits public/ai/hello.html to GitHub
Result:    ai.erikg.org/hello.html is live on the next deploy
```

JSON data collections (fast state) are still stored in Cloudflare KV.

## API Reference (`ai.erikg.org/api/*`)

All routes except `/ping` require: `Authorization: Bearer <API_TOKEN>`

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/ping` | Health check |
| `GET` | `/api/pages` | List all AI pages |
| `GET` | `/api/pages/:slug` | Read page HTML |
| `PUT` | `/api/pages/:slug` | Write/update page (commits to GitHub) |
| `DELETE` | `/api/pages/:slug` | Delete page |
| `GET` | `/api/data/:collection` | Read JSON collection from KV |
| `POST` | `/api/data/:collection` | Write JSON collection to KV |
| `DELETE` | `/api/data/:collection` | Delete KV collection |

**PUT body:**
```json
{
  "html": "<html>...</html>",
  "title": "Optional page title",
  "message": "Optional git commit message"
}
```

## Project Structure

```
erikg-cloudflare/
├── dist/               # Main portfolio static site (erikg.org)
│   └── index.html
├── public/
│   └── ai/             # AI-managed HTML pages (ai.erikg.org)
│       └── *.html
├── server/
│   └── _worker.js      # Cloudflare Worker router + API logic
└── wrangler.json       # Cloudflare deployment config
```

## Secrets Setup

Copy `.dev.vars.example` → `.dev.vars` for local dev.

For production, set via Wrangler:
```sh
wrangler secret put API_TOKEN      # Bearer token for your AI
wrangler secret put GITHUB_TOKEN   # Fine-grained PAT: Contents read+write on this repo
```

## Deployment

```sh
npm run deploy   # wrangler deploy
```

Routes are configured in `wrangler.json` to cover `erikg.org/*` and `*.erikg.org/*`.
