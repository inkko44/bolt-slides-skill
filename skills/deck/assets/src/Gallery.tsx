import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { DeckCtx } from './deck/DeckContext'
import Slide from './deck/Slide'
import Build from './deck/Build'
import Reveal from './deck/Reveal'
import Bento from './components/Bento'
import Split from './components/Split'
import StatGrid from './components/StatGrid'
import CountUp from './components/CountUp'
import TiltCard from './components/TiltCard'
import Marquee from './components/Marquee'
import VisualDashboard from './components/VisualDashboard'
import Accordion from './components/Accordion'
import Comparison from './components/Comparison'
import Tabs from './components/Tabs'
import Timeline from './components/Timeline'
import CodeWindow from './components/CodeWindow'
import BrowserFrame from './components/BrowserFrame'
import SpotlightCard from './components/SpotlightCard'
import { BarChart, LineChart, DonutChart } from './components/Charts'
import './styles/gallery.css'

/* ─────────────────────────────────────────────────────────────────────────
   COMPONENT GALLERY — a local preview of every component, for development.
   Run `npm run dev` and this is what you see (the deck demo is at #deck).
   To add a component: build it in src/components/, then drop a <Frame> (for a
   full-slide component) or a <Swatch> (for a widget) into a section below.
   ───────────────────────────────────────────────────────────────────────── */

/* Renders a full-slide component at true viewport size, scaled into a card —
   so responsive vw/vh units stay faithful (same trick as the rail thumbnails). */
function Frame({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [d, setD] = useState({ vw: 1280, vh: 720, scale: 0.3 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setD({ vw: window.innerWidth, vh: window.innerHeight, scale: el.clientWidth / window.innerWidth })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => { ro.disconnect(); window.removeEventListener('resize', update) }
  }, [])
  return (
    <div className="gx-card">
      <div className="gx-frame" ref={ref} style={{ aspectRatio: `${d.vw} / ${d.vh}` }}>
        <div className="gx-scale" style={{ width: d.vw, height: d.vh, transform: `scale(${d.scale})` }}>{children}</div>
      </div>
      <div className="gx-label">{title}</div>
    </div>
  )
}

/* A labeled card for a widget-sized component. `half` = 2 per row, `wide` = full row. */
function Swatch({ title, half, wide, children }: { title: string; half?: boolean; wide?: boolean; children: ReactNode }) {
  return (
    <div className={'gx-card gx-swatch' + (half ? ' gx-half' : '') + (wide ? ' gx-wide' : '')}>
      <div className="gx-swatch-body">{children}</div>
      <div className="gx-label">{title}</div>
    </div>
  )
}

const tiles = [
  { k: 'Hero tile', fig: <CountUp to={9.4} decimals={1} suffix="M" />, body: 'One big tile anchors the grid.', c: 5, r: 2, variant: 'glow' as const },
  { k: 'Uptime', fig: <CountUp to={99.99} decimals={2} suffix="%" />, c: 4 },
  { k: 'Regions', fig: <CountUp to={28} />, c: 3, variant: 'accent' as const },
  { k: 'Connectors', title: '120+ native', c: 4 },
  { k: 'Compliance', title: 'SOC 2 · HIPAA', c: 3 },
]

export default function Gallery() {
  return (
    // non-static + auto so every component plays its motion (count-ups, builds, draws)
    <MotionConfig reducedMotion="user">
    <DeckCtx.Provider value={{ clicks: 9999, isStatic: false, auto: true, stagger: 0.12 }}>
      <div className="gx">
        <div className="gx-head">
          <div>
            <div className="gx-title">Component gallery</div>
            <div className="gx-sub">Local preview of every component · edit in <code>src/components/</code></div>
          </div>
          <a className="gx-link" href="#deck">View deck demo →</a>
        </div>

        <section className="gx-section">
          <h2>Slide layouts</h2>
          <div className="gx-grid">
            <Frame title="<Slide center>">
              <Slide center>
                <div className="kicker" style={{ marginBottom: 14 }}>Cover</div>
                <h1 className="display"><span className="accent-text">Title</span></h1>
                <p className="subhead" style={{ marginTop: 18 }}>A centered cover / statement slide.</p>
              </Slide>
            </Frame>
            <Frame title="<Bento>">
              <Bento kicker="Platform" title="Bento tile grid." tiles={tiles} />
            </Frame>
            <Frame title="<Split>">
              <Split
                kicker="How it works"
                title={<>Edge-to-edge <span className="accent-text">media.</span></>}
                body="Text one side, full-bleed media the other."
                media={<>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 100% at 30% 20%, color-mix(in srgb, var(--primary) 22%, transparent), transparent 60%), var(--surface-2)' }} />
                  <div style={{ position: 'relative', padding: 40 }}><TiltCard><VisualDashboard /></TiltCard></div>
                </>}
              />
            </Frame>
            <Frame title="<StatGrid>">
              <StatGrid kicker="By the numbers" title="Proof points." stats={[
                { value: <CountUp to={92} suffix="%" />, label: 'Retention' },
                { value: <CountUp to={3.4} decimals={1} prefix="$" suffix="B" />, label: 'Processed' },
                { value: <CountUp to={120} suffix="+" />, label: 'Integrations' },
              ]} />
            </Frame>
          </div>
        </section>

        <section className="gx-section">
          <h2>Components</h2>
          <div className="gx-grid">
            <Swatch title="<CountUp />">
              <div className="accent-text" style={{ fontSize: 72, fontWeight: 600, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>
                <CountUp to={230} suffix="%" />
              </div>
            </Swatch>
            <Swatch title="<VisualDashboard />"><VisualDashboard /></Swatch>
            <Swatch title="<TiltCard /> (hover me)">
              <TiltCard>
                <div style={{ width: 240, padding: 28, borderRadius: 'var(--radius)', background: 'var(--surface-2)', border: '1px solid var(--hair)' }}>
                  <div className="kicker">Tilt me</div>
                  <div className="accent-text" style={{ fontSize: 52, fontWeight: 600, marginTop: 6 }}>3D</div>
                </div>
              </TiltCard>
            </Swatch>
            <Swatch title="<Marquee />"><Marquee items={['Acme', 'Globex', 'Initech', 'Umbra', 'Hooli', 'Soylent']} /></Swatch>
            <Swatch title="<Build /> (auto-stagger)">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
                <Build at={1}><div className="gx-pill">Builds reveal…</div></Build>
                <Build at={2}><div className="gx-pill">…one at a time…</div></Build>
                <Build at={3}><div className="gx-pill">…staggered.</div></Build>
              </div>
            </Swatch>
            <Swatch title="<Reveal />">
              <Reveal><div className="accent-text" style={{ fontSize: 40, fontWeight: 600 }}>Fades up on view</div></Reveal>
            </Swatch>
            <Swatch title="<Accordion />" half>
              <Accordion items={[
                { title: 'What is this?', body: 'A clean, animated accordion for FAQs, feature breakdowns, or agenda detail.' },
                { title: 'How does it animate?', body: 'Framer Motion animates the panel height; one panel is open at a time by default (pass single={false} for multi-open).' },
                { title: 'Is it themeable?', body: 'Yes — it reads the same :root tokens, so it matches the deck automatically.' },
              ]} />
            </Swatch>

            <Swatch title="<Comparison />" half>
              <Comparison
                cols={['', 'Acme', 'Legacy']}
                highlight={0}
                rows={[
                  { label: 'Realtime sync', values: [true, false] },
                  { label: 'Self-host', values: [true, false] },
                  { label: 'Setup time', values: ['5 min', '2 weeks'] },
                  { label: 'Price', values: ['$29', '$99'] },
                ]}
              />
            </Swatch>

            <Swatch title="<Tabs />" half>
              <Tabs tabs={[
                { label: 'Overview', content: <p className="lead" style={{ margin: 0 }}>Switch tabs — the pill slides and the panel cross-fades.</p> },
                { label: 'Activity', content: <div style={{ height: 150 }}><BarChart data={[{ label: 'M', value: 30 }, { label: 'T', value: 52 }, { label: 'W', value: 41 }, { label: 'T', value: 68 }, { label: 'F', value: 80 }]} height={150} /></div> },
                { label: 'Status', content: <p className="lead" style={{ margin: 0 }}>All systems operational.</p> },
              ]} />
            </Swatch>

            <Swatch title="<CodeWindow />" half>
              <CodeWindow
                title="App.tsx"
                highlight={[7]}
                code={`import { Deck, Slide } from './deck'

export default function App() {
  return (
    <Deck autoplay>
      <Slide center>
        <h1 className="display">Hello</h1>
      </Slide>
    </Deck>
  )
}`}
              />
            </Swatch>

            <Swatch title="<Timeline />">
              <Timeline items={[
                { time: 'Q1', title: 'Private beta', body: 'First 50 design partners.' },
                { time: 'Q2', title: 'Public launch', body: 'Self-serve signup + billing.' },
                { time: 'Q3', title: 'Enterprise', body: 'SSO, audit logs, SOC 2.' },
              ]} />
            </Swatch>

            <Swatch title="<BrowserFrame />">
              <BrowserFrame url="app.acme.com">
                <div style={{ padding: 22, background: 'radial-gradient(120% 100% at 20% 0%, color-mix(in srgb, var(--primary) 16%, transparent), transparent 55%), var(--bg)' }}>
                  <VisualDashboard />
                </div>
              </BrowserFrame>
            </Swatch>

            <Swatch title="<SpotlightCard /> (hover me)">
              <SpotlightCard>
                <div className="kicker" style={{ marginBottom: 10 }}>Hover me</div>
                <h3 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px' }}>Cursor-follow glow</h3>
                <p style={{ color: 'var(--fg-muted)', fontSize: 15, margin: 0 }}>The accent glow tracks your pointer — the Linear/Vercel card hover.</p>
              </SpotlightCard>
            </Swatch>

            <Swatch title="<BarChart />"><div style={{ height: 180, width: '100%' }}><BarChart data={[{ label: 'Mon', value: 44 }, { label: 'Tue', value: 62 }, { label: 'Wed', value: 55 }, { label: 'Thu', value: 78 }, { label: 'Fri', value: 96 }]} height={180} /></div></Swatch>
            <Swatch title="<LineChart />"><div style={{ width: '100%' }}><LineChart points={[12, 18, 15, 26, 22, 34, 30, 42]} height={170} /></div></Swatch>
            <Swatch title="<DonutChart />"><DonutChart value={72} label="Adoption" /></Swatch>
          </div>
        </section>

        {/* ── ADD NEW COMPONENT PREVIEWS HERE ──────────────────────────────
        <section className="gx-section">
          <h2>My new components</h2>
          <div className="gx-grid">
            <Swatch title="<MyWidget />"><MyWidget /></Swatch>
            <Frame title="<MySlide />"><MySlide /></Frame>
          </div>
        </section>
        ─────────────────────────────────────────────────────────────────── */}
      </div>
    </DeckCtx.Provider>
    </MotionConfig>
  )
}
