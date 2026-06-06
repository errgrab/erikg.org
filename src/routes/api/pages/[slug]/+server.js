import { json, error } from '@sveltejs/kit';

export async function GET({ params, platform }) {
  // TODO: implement — read page HTML from GitHub
  return json({ slug: params.slug, html: '' });
}

export async function PUT({ params, request, platform }) {
  // TODO: implement — write/update page via GitHub API
  // Requires: API_TOKEN auth, GITHUB_TOKEN for GitHub
  const body = await request.json();
  return json({ slug: params.slug, ok: true });
}

export async function DELETE({ params, platform }) {
  // TODO: implement — delete page via GitHub API
  return json({ slug: params.slug, deleted: true });
}
