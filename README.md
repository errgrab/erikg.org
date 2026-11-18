# erikg.org

Eleventy application powering the main **erikg.org** site, deployed on Cloudflare Pages.

## Project Structure

```
erikg.org/
├── src/
│   ├── _includes/              # Nunjucks layouts and shared partials
│   ├── _scripts/               # Browser-only source modules
│   ├── assets/                 # Static media and generated browser bundles
│   ├── lib/styles/             # Shared CSS foundation
│   ├── gallery.md              # Gallery page and image inventory
│   ├── me.md                   # About page
│   ├── site.md                 # Experimental page
│   └── index.md                # Home page
├── functions/api/ping.js       # Cloudflare Pages health endpoint
├── eleventy.config.js          # Eleventy configuration
└── wrangler.json               # Cloudflare deployment config
```

`src/assets/` replaces a separate top-level `static/` directory. Eleventy copies it
to the site root without transforming the original gallery images, which keeps
pixel art and animated GIFs lossless while keeping all source files together.
The `src/assets/js/` directory is generated during the build and is ignored by
Git.

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
npm run dev       # Start Eleventy dev server
npm run build     # Build to _site/
npm run preview   # Preview with Wrangler
```

## Deployment

```sh
npm run deploy   # Build and deploy to Cloudflare
```

Routes are configured in `wrangler.json` to cover `erikg.org/*` and `*.erikg.org/*`.
