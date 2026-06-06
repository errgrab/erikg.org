import { json, error } from '@sveltejs/kit';

export async function GET({ params, platform }) {
  // TODO: implement — read JSON collection from KV
  const data = await platform.env.KV.get(`data:${params.collection}`, 'json');
  return json(data ?? {});
}

export async function POST({ params, request, platform }) {
  // TODO: implement — write JSON collection to KV
  const body = await request.json();
  await platform.env.KV.put(`data:${params.collection}`, JSON.stringify(body));
  return json({ ok: true });
}

export async function DELETE({ params, platform }) {
  // TODO: implement — delete KV collection
  await platform.env.KV.delete(`data:${params.collection}`);
  return json({ deleted: true });
}
