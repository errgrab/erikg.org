import { json, error } from '@sveltejs/kit';

export async function GET({ platform }) {
  // TODO: implement — list pages from GitHub
  return json({ pages: [] });
}
