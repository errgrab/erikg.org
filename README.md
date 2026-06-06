# erikg.org

SvelteKit application powering the entire **erikg.org** domain, deployed on Cloudflare.

## Architecture

```
erikg.org, www.erikg.org   →  SvelteKit app (main portfolio site)
ai.erikg.org               →  static/ai/    (AI-managed pages)
  ai.erikg.org/api/*       →  Server routes  (authenticated)
*.erikg.org                →  static/<subdomain>/
```

One repository. One deployment. All subdomains managed here.

## How AI Pages Work

Your AI assistant talks to the `ai.erikg.org/api/*` REST API using a Bearer token. Instead of storing pages in a database, the API commits HTML files directly to `static/ai/` in this repo via the GitHub API. Every AI-created page becomes a real, version-controlled file.

```
AI sends:  PUT ai.erikg.org/api/pages/hello  { html: "..." }
API:       commits static/ai/hello.html to GitHub
Result:    ai.erikg.org/hello.html is live on the next deploy
```

JSON data collections (fast state) are stored in Cloudflare KV.

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
erikg.org/
├── src/
│   ├── app.html                # HTML shell
│   ├── lib/
│   │   ├── components/         # Reusable Svelte components
│   │   ├── data/projects.js    # Project listings
│   │   ├── styles/shared.css   # Global styles
│   │   └── themes.js           # Theme definitions
│   └── routes/
│       ├── +layout.svelte      # Shared layout (header, footer, theme)
│       ├── +page.svelte        # Home (projects grid)
│       ├── me/+page.svelte     # About page
│       ├── gallery/+page.svelte# Gallery page
│       ├── ai/+page.svelte     # AI pages index
│       └── api/                # Server routes (API)
│           ├── ping/+server.js
│           ├── pages/+server.js
│           ├── pages/[slug]/+server.js
│           └── data/[collection]/+server.js
├── static/
│   ├── ai/                     # AI-managed HTML pages (ai.erikg.org)
│   └── gallery/                # Gallery images
├── svelte.config.js            # SvelteKit config (Cloudflare adapter)
├── vite.config.js              # Vite config (SvelteKit plugin)
└── wrangler.json               # Cloudflare deployment config
```

## Secrets Setup

Copy `.dev.vars.example` → `.dev.vars` for local dev.

For production, set via Wrangler:
```sh
wrangler secret put API_TOKEN      # Bearer token for your AI
wrangler secret put GITHUB_TOKEN   # Fine-grained PAT: Contents read+write on this repo
```

## KV Namespace

Create a KV namespace for data collections:
```sh
wrangler kv namespace create DATA
```

Add the binding to `wrangler.json`:
```json
{
  "kv_namespaces": [
    { "binding": "KV", "id": "your-namespace-id" }
  ]
}
```

## Development

```sh
npm run dev       # Start SvelteKit dev server
npm run build     # Build for production
npm run preview   # Preview production build locally
```

## Deployment

```sh
npm run deploy   # Build and deploy to Cloudflare
```

Routes are configured in `wrangler.json` to cover `erikg.org/*` and `*.erikg.org/*`.
