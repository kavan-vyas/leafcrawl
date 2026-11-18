// Leafcrawl CORS relay: forwards the caller's own Crawlbase token, stores nothing.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Expose-Headers': 'pc_status, original_status, cb_status, url',
}
export default {
  async fetch(req) {
    if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })
    const u = new URL(req.url)
    if (!u.searchParams.get('token') || !u.searchParams.get('url'))
      return new Response(JSON.stringify({ error: 'token and url required' }), { status: 400, headers: { ...CORS, 'content-type': 'application/json' } })
    const r = await fetch('https://api.crawlbase.com/' + u.search, { headers: { 'Accept-Encoding': 'gzip' } })
    const h = new Headers(r.headers)
    Object.entries(CORS).forEach(([k, v]) => h.set(k, v))
    return new Response(r.body, { status: r.status, headers: h })
  },
}
