import { useEffect, useMemo, useState } from 'react'

const DEFAULT_RELAY = import.meta.env.VITE_RELAY || ''
const SCRAPERS = ['', 'generic-extractor', 'instagram-profile', 'instagram-post', 'instagram-hashtag', 'amazon-product-details',
  'google-serp', 'linkedin-profile', 'twitter-profile', 'youtube-video', 'email-extractor']

// ---------- storage (safe) ----------
const ls = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v) } catch { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} },
}
function useStored(k, d) {
  const [v, setV] = useState(() => ls.get(k, d))
  useEffect(() => ls.set(k, v), [k, v])
  return [v, setV]
}
function useRoute() {
  const get = () => location.hash.replace(/^#\/?/, '') || 'home'
  const [r, setR] = useState(get)
  useEffect(() => { const f = () => { setR(get()); scrollTo(0, 0) }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  return r
}

// ---------- ui bits ----------
const Btn = ({ kind = 'primary', className = '', ...p }) => (
  <button {...p} className={`rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${kind === 'primary'
    ? 'bg-leaf text-ink hover:bg-leaf-2 active:bg-leaf-3' : 'border border-line-2 text-t0 hover:bg-bg-3'} ${className}`} />
)
const A = ({ to, kind, children, className = '' }) => (
  <a href={`#/${to}`} className={`inline-block rounded-lg px-4 py-2 text-sm font-semibold transition ${kind === 'ghost'
    ? 'border border-line-2 text-t0 hover:bg-bg-3' : 'bg-leaf text-ink hover:bg-leaf-2'} ${className}`}>{children}</a>
)
const Card = ({ className = '', ...p }) => <div {...p} className={`rounded-xl border border-line bg-bg-2 p-5 ${className}`} />
const Field = ({ label, hint, children }) => (
  <label className="block text-sm"><span className="mb-1 block font-medium text-t0">{label}</span>{children}
    {hint && <span className="mt-1 block text-xs text-t2">{hint}</span>}</label>
)
const inputCls = 'w-full rounded-lg border border-line-2 bg-bg-1 px-3 py-2 text-t0 outline-none focus:border-leaf'

function Code({ tabs }) {
  const names = Object.keys(tabs); const [t, setT] = useState(names[0]); const [ok, setOk] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(tabs[t]); setOk(true); setTimeout(() => setOk(false), 1200) }
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg-1">
      <div className="flex items-center gap-1 border-b border-line px-2 py-1.5 text-xs">
        {names.map(n => <button key={n} onClick={() => setT(n)}
          className={`rounded px-2.5 py-1 ${n === t ? 'bg-bg-3 text-t0' : 'text-t2 hover:text-t1'}`}>{n}</button>)}
        <button onClick={copy} className="ml-auto rounded px-2 py-1 text-t2 hover:text-leaf">{ok ? 'Copied' : 'Copy'}</button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-teal">{tabs[t]}</pre>
    </div>
  )
}
const snippets = (token = 'YOUR_TOKEN', url = 'https://www.instagram.com/kingsmathschool/', scraper = 'instagram-profile') => {
  const q = `token=${token}&url=${encodeURIComponent(url)}${scraper ? `&scraper=${scraper}` : ''}`
  return {
    curl: `curl "https://api.crawlbase.com/?${q}"`,
    Python: `import requests\n\nr = requests.get("https://api.crawlbase.com/", params={\n    "token": "${token}",\n    "url": "${url}",${scraper ? `\n    "scraper": "${scraper}",` : ''}\n})\nprint(r.headers.get("pc_status"), r.text[:500])`,
    Node: `const p = new URLSearchParams({ token: "${token}", url: "${url}"${scraper ? `, scraper: "${scraper}"` : ''} })\nconst r = await fetch("https://api.crawlbase.com/?" + p)\nconsole.log(r.headers.get("pc_status"), await r.text())`,
  }
}

// ---------- layout ----------
function Nav({ route }) {
  const [open, setOpen] = useState(false)
  const links = [['playground', 'Playground'], ['docs', 'Docs'], ['pricing', 'Pricing'], ['dashboard', 'Dashboard']]
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg-0/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <a href="#/" className="flex items-center gap-2 font-bold text-t0">
          <svg width="22" height="22" viewBox="0 0 32 32"><path d="M6 26C6 12 16 6 28 4c-2 12-8 22-22 22z" fill="#3DDC84" /><path d="M6 26 20 12" stroke="#04130A" strokeWidth="2" /></svg>
          Leafcrawl
        </a>
        <nav className="hidden gap-5 text-sm md:flex">
          {links.map(([k, l]) => <a key={k} href={`#/${k}`} className={route === k ? 'text-leaf' : 'text-t1 hover:text-t0'}>{l}</a>)}
        </nav>
        <div className="ml-auto hidden md:block"><A to="settings" kind="ghost">Settings</A></div>
        <button className="ml-auto text-t0 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
      {open && <nav className="flex flex-col gap-3 border-t border-line px-4 py-3 text-sm md:hidden" onClick={() => setOpen(false)}>
        {[...links, ['settings', 'Settings']].map(([k, l]) => <a key={k} href={`#/${k}`} className="text-t1">{l}</a>)}
      </nav>}
    </header>
  )
}
const Footer = () => (
  <footer className="mt-24 border-t border-line">
    <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-4 py-8 text-sm text-t2">
      <span>© {new Date().getFullYear()} Leafcrawl · runs on your own Crawlbase token</span>
      <span className="flex gap-4"><a href="#/docs">Docs</a><a href="#/pricing">Pricing</a><a href="https://github.com/kavan-vyas/leafcrawl">GitHub</a></span>
    </div>
  </footer>
)

// ---------- pages ----------
function Home() {
  const feats = [
    ['🌿', 'Bring your own token', 'Your Crawlbase token stays in your browser. No accounts, no database.'],
    ['⚡', 'Live playground', 'Paste any URL, pick a scraper, and get JSON or HTML back in seconds.'],
    ['🖼️', 'Media grabber', 'Pulls every image link out of a result, ready to preview and download.'],
    ['📊', 'Local dashboard', 'Request history, success rate and a daily usage chart, all stored locally.'],
    ['🧩', 'Ready-made scrapers', 'Instagram, Google SERP, Amazon, LinkedIn, YouTube and more.'],
    ['🔒', 'Stateless relay', 'A tiny edge relay adds CORS headers and never logs or stores your token.'],
  ]
  const faq = [
    ['Is it free?', 'Leafcrawl is free. Crawlbase bills your own token, and new accounts get 1,000 free requests.'],
    ['Where is my token stored?', 'Only in this browser (localStorage). Clear it anytime in Settings.'],
    ['Why is there a relay?', 'Crawlbase does not send CORS headers, so browsers block direct calls. The relay only adds those headers.'],
    ['Can it scrape JavaScript-heavy sites?', 'Yes. Use your Crawlbase JavaScript token.'],
  ]
  return (<>
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-12 md:grid-cols-2 md:pt-24">
      <div>
        <span className="rounded-full border border-line-2 px-3 py-1 text-xs text-leaf">Web scraping without the setup</span>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-t0 md:text-5xl">Crawl any page.<br /><span className="text-leaf">Get clean data.</span></h1>
        <p className="mt-4 max-w-md text-lg text-t1">A fast front end for the Crawlbase API: test scrapers live, copy production code, and keep track of your usage.</p>
        <div className="mt-7 flex flex-wrap gap-3"><A to="playground">Open playground</A><A to="docs" kind="ghost">Read the docs</A></div>
      </div>
      <Code tabs={snippets()} />
    </section>
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-bold text-t0">Everything in one tab</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feats.map(([i, t, d]) => <Card key={t}><div className="text-2xl">{i}</div><h3 className="mt-3 font-semibold text-t0">{t}</h3><p className="mt-1 text-sm">{d}</p></Card>)}
      </div>
    </section>
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="text-2xl font-bold text-t0">FAQ</h2>
      <div className="mt-6 divide-y divide-line rounded-xl border border-line">
        {faq.map(([q, a]) => <details key={q} className="group px-5 py-4"><summary className="cursor-pointer font-medium text-t0">{q}</summary><p className="mt-2 text-sm">{a}</p></details>)}
      </div>
    </section>
  </>)
}

function extractImages(text) {
  const set = new Set()
  for (const m of text.matchAll(/https?:\\?\/\\?\/[^"'\s<>]+?\.(?:jpe?g|png|webp|gif)(?:\?[^"'\s<>]*)?/gi)) set.add(m[0].replace(/\\\//g, '/').replace(/&amp;/g, '&'))
  return [...set].slice(0, 200)
}

function Playground({ cfg, addLog }) {
  const [url, setUrl] = useStored('lc.url', 'https://www.instagram.com/kingsmathschool/')
  const [scraper, setScraper] = useStored('lc.scraper', 'instagram-profile')
  const [jsMode, setJs] = useState(false)
  const [busy, setBusy] = useState(false)
  const [res, setRes] = useState(null)
  const [tab, setTab] = useState('result')
  const ready = cfg.token && cfg.relay

  async function run() {
    setBusy(true); setRes(null); const t0 = performance.now()
    const p = new URLSearchParams({ token: cfg.token, url }); if (scraper) p.set('scraper', scraper); if (jsMode) p.set('page_wait', '2000')
    try {
      const r = await fetch(cfg.relay.replace(/\/$/, '') + '/?' + p)
      const body = await r.text(); const ms = Math.round(performance.now() - t0)
      const pc = r.headers.get('pc_status') || r.status
      let pretty = body; try { pretty = JSON.stringify(JSON.parse(body), null, 2) } catch {}
      const out = { ok: r.ok && String(pc) === '200', status: pc, orig: r.headers.get('original_status'), ms, body: pretty, size: body.length, images: extractImages(body) }
      setRes(out); setTab(out.images.length ? 'media' : 'result')
      addLog({ t: Date.now(), url, scraper, ok: out.ok, status: String(pc), ms })
    } catch (e) {
      setRes({ ok: false, status: 'network', ms: 0, body: String(e), size: 0, images: [] })
      addLog({ t: Date.now(), url, scraper, ok: false, status: 'network', ms: 0 })
    }
    setBusy(false)
  }
  const download = () => {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([res.body])); a.download = 'leafcrawl-result.' + (res.body.trim().startsWith('{') ? 'json' : 'html'); a.click()
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-t0">Playground</h1>
      {!ready && <Card className="mt-5 border-leaf/40">
        <p className="text-sm">{!cfg.token ? 'Add your Crawlbase token' : 'Set the relay URL'} in <a href="#/settings" className="text-leaf underline">Settings</a> to run live requests. Until then, copy the code on the right.</p>
      </Card>}
      <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card className="space-y-4 self-start">
          <Field label="Target URL"><input className={inputCls} value={url} onChange={e => setUrl(e.target.value)} /></Field>
          <Field label="Scraper" hint="Leave blank for raw HTML.">
            <select className={inputCls} value={scraper} onChange={e => setScraper(e.target.value)}>{SCRAPERS.map(s => <option key={s} value={s}>{s || '(raw HTML)'}</option>)}</select>
          </Field>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={jsMode} onChange={e => setJs(e.target.checked)} /> Wait 2s for JavaScript (JS token)</label>
          <Btn className="w-full" disabled={!ready || busy || !url} onClick={run}>{busy ? 'Crawling…' : 'Run request'}</Btn>
        </Card>
        <div className="min-w-0">
          {res ? (<Card className="p-0">
            <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3 text-sm">
              <span className={`rounded px-2 py-0.5 font-mono text-xs ${res.ok ? 'bg-leaf/15 text-leaf' : 'bg-red-500/15 text-red-300'}`}>pc_status {res.status}</span>
              {res.orig && <span className="text-t2">origin {res.orig}</span>}<span className="text-t2">{res.ms} ms</span><span className="text-t2">{(res.size / 1024).toFixed(1)} KB</span>
              <div className="ml-auto flex gap-1">
                {['result', 'media', 'code'].map(k => <button key={k} onClick={() => setTab(k)} className={`rounded px-2.5 py-1 text-xs ${tab === k ? 'bg-bg-3 text-t0' : 'text-t2'}`}>{k === 'media' ? `media (${res.images.length})` : k}</button>)}
                <button onClick={download} className="rounded px-2.5 py-1 text-xs text-t2 hover:text-leaf">download</button>
              </div>
            </div>
            {tab === 'result' && <pre className="max-h-[560px] overflow-auto p-4 font-mono text-xs text-t1">{res.body.slice(0, 200000)}</pre>}
            {tab === 'media' && (res.images.length ? <div className="grid max-h-[560px] grid-cols-2 gap-2 overflow-auto p-3 sm:grid-cols-3 md:grid-cols-4">
              {res.images.map(src => <a key={src} href={src} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden rounded-lg bg-bg-1">
                <img src={src} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover" alt="" /></a>)}
            </div> : <p className="p-6 text-sm text-t2">No image links found in this result.</p>)}
            {tab === 'code' && <div className="p-3"><Code tabs={snippets('YOUR_TOKEN', url, scraper)} /></div>}
          </Card>) : <Code tabs={snippets('YOUR_TOKEN', url, scraper)} />}
        </div>
      </div>
    </div>
  )
}

function Docs() {
  const params = [['token', 'required', 'Your Crawlbase token (normal or JavaScript).'], ['url', 'required', 'Target page, URL-encoded.'],
    ['scraper', 'optional', 'Returns structured JSON, e.g. instagram-profile, google-serp.'], ['format', 'optional', 'json or html response wrapper.'],
    ['page_wait', 'optional', 'ms to wait before capture (JS token).'], ['country', 'optional', 'Two-letter geo for the request, e.g. GB.'],
    ['device', 'optional', 'desktop or mobile user agent.']]
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-t0">Docs</h1>
      <p className="mt-3">Every request is a single GET. Leafcrawl sends it through a stateless relay so your browser can read the response.</p>
      <h2 className="mt-10 text-xl font-semibold text-t0">Quick start</h2>
      <div className="mt-4"><Code tabs={snippets()} /></div>
      <h2 className="mt-10 text-xl font-semibold text-t0">Parameters</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-line"><table className="w-full text-left text-sm">
        <thead className="bg-bg-1 text-t0"><tr><th className="p-3">Name</th><th className="p-3">Type</th><th className="p-3">Description</th></tr></thead>
        <tbody>{params.map(([n, t, d]) => <tr key={n} className="border-t border-line"><td className="p-3 font-mono text-teal">{n}</td><td className="p-3 text-t2">{t}</td><td className="p-3">{d}</td></tr>)}</tbody>
      </table></div>
      <h2 className="mt-10 text-xl font-semibold text-t0">Status codes</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
        <li><code className="text-teal">pc_status 200</code>: success</li>
        <li><code className="text-teal">520 / 525</code>: target blocked or timed out. Retry, or switch to the JS token.</li>
        <li><code className="text-teal">401</code>: bad token</li><li><code className="text-teal">429</code>: rate limit on your plan</li>
      </ul>
      <h2 className="mt-10 text-xl font-semibold text-t0">Self-host the relay</h2>
      <Code tabs={{ shell: 'cd worker\nnpx wrangler deploy\n# then paste the *.workers.dev URL into Settings → Relay URL' }} />
    </div>
  )
}

function Pricing() {
  const plans = [['Free', '£0', ['Full playground', 'Docs + snippets', 'Local dashboard', 'Crawlbase free tier: 1,000 requests'], true],
    ['Builder', '£0', ['Everything in Free', 'Bring a paid Crawlbase token', 'JS rendering', 'Higher Crawlbase limits'], false],
    ['Team', '£0', ['Share settings via export', 'Self-hosted relay', 'Unlimited history', 'Priority nothing, it is free'], false]]
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-t0">Pricing</h1>
      <p className="mt-3 text-center">Leafcrawl is free forever. You only pay Crawlbase for the requests you make.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {plans.map(([n, p, f, hot]) => <Card key={n} className={hot ? 'border-leaf' : ''}>
          {hot && <span className="text-xs font-semibold text-leaf">MOST POPULAR</span>}
          <h3 className="mt-1 text-lg font-semibold text-t0">{n}</h3>
          <p className="mt-2 text-4xl font-extrabold text-t0">{p}<span className="text-base font-normal text-t2">/mo</span></p>
          <ul className="mt-5 space-y-2 text-sm">{f.map(x => <li key={x}>✓ {x}</li>)}</ul>
          <A to="playground" kind={hot ? undefined : 'ghost'} className="mt-6 w-full text-center">Start free</A>
        </Card>)}
      </div>
    </div>
  )
}

function Dashboard({ log, setLog }) {
  const days = useMemo(() => {
    const out = []; for (let d = 13; d >= 0; d--) {
      const day = new Date(Date.now() - d * 864e5).toISOString().slice(0, 10)
      const items = log.filter(l => new Date(l.t).toISOString().slice(0, 10) === day)
      out.push({ day, ok: items.filter(i => i.ok).length, bad: items.filter(i => !i.ok).length })
    } return out
  }, [log])
  const max = Math.max(1, ...days.map(d => d.ok + d.bad))
  const ok = log.filter(l => l.ok).length
  const avg = log.length ? Math.round(log.reduce((s, l) => s + l.ms, 0) / log.length) : 0
  const stats = [['Requests', log.length], ['Success rate', log.length ? Math.round(ok / log.length * 100) + '%' : '–'], ['Avg latency', avg ? avg + ' ms' : '–']]
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center"><h1 className="text-3xl font-bold text-t0">Dashboard</h1>
        {log.length > 0 && <Btn kind="ghost" className="ml-auto" onClick={() => confirm('Clear all history?') && setLog([])}>Clear history</Btn>}</div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">{stats.map(([k, v]) => <Card key={k}><p className="text-sm text-t2">{k}</p><p className="mt-1 text-3xl font-bold text-t0">{v}</p></Card>)}</div>
      <Card className="mt-6">
        <p className="mb-4 text-sm font-medium text-t0">Requests, last 14 days <span className="ml-3 text-xs text-t2"><span className="text-leaf">■</span> ok <span className="ml-2 text-red-300">■</span> failed</span></p>
        <div className="flex h-40 items-end gap-1.5">
          {days.map(d => <div key={d.day} className="flex flex-1 flex-col justify-end" title={`${d.day}: ${d.ok} ok, ${d.bad} failed`}>
            <div className="rounded-t bg-red-400/70" style={{ height: `${d.bad / max * 100}%` }} />
            <div className={`bg-leaf ${d.bad ? '' : 'rounded-t'}`} style={{ height: `${d.ok / max * 100}%` }} />
          </div>)}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-t2"><span>{days[0].day.slice(5)}</span><span>today</span></div>
      </Card>
      <Card className="mt-6 p-0"><div className="overflow-x-auto"><table className="w-full text-left text-sm">
        <thead className="bg-bg-1 text-t0"><tr><th className="p-3">Time</th><th className="p-3">URL</th><th className="p-3">Scraper</th><th className="p-3">Status</th><th className="p-3">ms</th></tr></thead>
        <tbody>{log.length ? [...log].reverse().slice(0, 100).map(l => <tr key={l.t} className="border-t border-line">
          <td className="p-3 whitespace-nowrap text-t2">{new Date(l.t).toLocaleString()}</td><td className="max-w-xs truncate p-3">{l.url}</td>
          <td className="p-3 font-mono text-xs">{l.scraper || 'html'}</td><td className={`p-3 font-mono ${l.ok ? 'text-leaf' : 'text-red-300'}`}>{l.status}</td><td className="p-3">{l.ms}</td>
        </tr>) : <tr><td colSpan="5" className="p-6 text-center text-t2">No requests yet. <a href="#/playground" className="text-leaf">Run one</a>.</td></tr>}</tbody>
      </table></div></Card>
    </div>
  )
}

function Settings({ cfg, setCfg }) {
  const [token, setToken] = useState(cfg.token); const [relay, setRelay] = useState(cfg.relay); const [saved, setSaved] = useState(false)
  const save = () => { setCfg({ token: token.trim(), relay: relay.trim() }); setSaved(true); setTimeout(() => setSaved(false), 1500) }
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold text-t0">Settings</h1>
      <Card className="mt-6 space-y-5">
        <Field label="Crawlbase token" hint="Stored only in this browser. Get one free at crawlbase.com."><input type="password" className={inputCls} value={token} onChange={e => setToken(e.target.value)} placeholder="paste token" /></Field>
        <Field label="Relay URL" hint="Your Cloudflare Worker, e.g. https://leafcrawl-relay.you.workers.dev"><input className={inputCls} value={relay} onChange={e => setRelay(e.target.value)} /></Field>
        <div className="flex gap-3"><Btn onClick={save}>{saved ? 'Saved ✓' : 'Save'}</Btn><Btn kind="ghost" onClick={() => { setToken(''); setCfg({ ...cfg, token: '' }) }}>Forget token</Btn></div>
      </Card>
    </div>
  )
}

export default function App() {
  const route = useRoute()
  const [cfg, setCfg] = useStored('lc.cfg', { token: '', relay: DEFAULT_RELAY })
  const [log, setLog] = useStored('lc.log', [])
  const conf = { ...cfg, relay: cfg.relay || DEFAULT_RELAY }
  const addLog = e => setLog(l => [...l.slice(-999), e])
  const page = { playground: <Playground cfg={conf} addLog={addLog} />, docs: <Docs />, pricing: <Pricing />,
    dashboard: <Dashboard log={log} setLog={setLog} />, settings: <Settings cfg={conf} setCfg={setCfg} /> }[route] || <Home />
  return <div className="min-h-screen font-sans"><Nav route={route} /><main>{page}</main><Footer /></div>
}
