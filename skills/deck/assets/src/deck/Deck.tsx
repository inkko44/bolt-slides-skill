import { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { MotionConfig } from 'framer-motion'
import { DeckCtx } from './DeckContext'
import { IconGrid, IconLeft, IconRight, IconPencil, IconExpand, IconShrink, IconPresent, IconClose } from './icons'

/* ── The paged presentation engine + the Slidev-style chrome (dock + rail).
   Wrap your <Slide>/<Bento>/<Split>/… in <Deck>. Each top-level child is one
   slide. Advance with the dock, click, or keyboard:
     → / ↓ / Space   next (reveals the next <Build>, then the next slide)
     ← / ↑           previous            O overview    F fullscreen
     Home / End      first / last        D draw        P presenter
   Copy verbatim; theme only via the :root tokens. ───────────────────────── */

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

function Thumb({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [d, setD] = useState({ vw: 1280, vh: 720, scale: 0.15 })
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const update = () => setD({ vw: window.innerWidth, vh: window.innerHeight, scale: el.clientWidth / window.innerWidth })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => { ro.disconnect(); window.removeEventListener('resize', update) }
  }, [])
  return (
    <div className="noir-thumb-frame" ref={frameRef} style={{ aspectRatio: `${d.vw} / ${d.vh}` }}>
      <DeckCtx.Provider value={{ clicks: 9999, isStatic: true }}>
        <div className="noir-thumb-scale" style={{ width: d.vw, height: d.vh, transform: `scale(${d.scale})` }}>{children}</div>
      </DeckCtx.Provider>
    </div>
  )
}

function DrawCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight }
    resize()
    const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#4fe5b0'
    let drawing = false
    const down = (e: PointerEvent) => { drawing = true; ctx.beginPath(); ctx.moveTo(e.clientX, e.clientY) }
    const move = (e: PointerEvent) => {
      if (!drawing) return
      ctx.lineTo(e.clientX, e.clientY); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke()
    }
    const up = () => { drawing = false }
    c.addEventListener('pointerdown', down); c.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up); window.addEventListener('resize', resize)
    return () => { c.removeEventListener('pointerdown', down); c.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="noir-draw" />
}

export default function Deck({ children }: { children: ReactNode }) {
  const slides = useMemo(() => Children.toArray(children) as ReactElement[], [children])
  const total = slides.length

  const [slide, setSlide] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [curMax, setCurMax] = useState(0)
  const [railOpen, setRailOpen] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [presenter, setPresenter] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [fs, setFs] = useState(false)

  const registerMax = useCallback((at: number) => setCurMax((m) => Math.max(m, at)), [])

  const go = useCallback((i: number) => { setSlide(Math.max(0, Math.min(total - 1, i))); setClicks(0); setCurMax(0) }, [total])
  const next = useCallback(() => {
    if (clicks < curMax) { setClicks(clicks + 1); return }
    if (slide < total - 1) { setSlide(slide + 1); setClicks(0); setCurMax(0) }
  }, [clicks, curMax, slide, total])
  const prev = useCallback(() => {
    if (clicks > 0) { setClicks(clicks - 1); return }
    if (slide > 0) { setSlide(slide - 1); setClicks(9999); setCurMax(0) }
  }, [clicks, slide])

  const toggleFs = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }, [])
  const togglePresenter = useCallback(() => setPresenter((v) => !v), [])

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      switch (e.key) {
        case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': e.preventDefault(); next(); break
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp': e.preventDefault(); prev(); break
        case 'Home': e.preventDefault(); go(0); break
        case 'End': e.preventDefault(); go(total - 1); break
        case 'o': case 'O': setRailOpen((v) => !v); break
        case 'f': case 'F': toggleFs(); break
        case 'd': case 'D': setDrawing((v) => !v); break
        case 'p': case 'P': togglePresenter(); break
        case 'Escape': setRailOpen(false); setDrawing(false); break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, total, toggleFs, togglePresenter])

  // URL hash sync
  useEffect(() => {
    const h = parseInt(location.hash.slice(1), 10)
    if (h >= 1 && h <= total) setSlide(h - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => { const want = String(slide + 1); if (location.hash.slice(1) !== want) history.replaceState(null, '', '#' + want) }, [slide])
  useEffect(() => {
    const onHash = () => { const h = parseInt(location.hash.slice(1), 10); if (h >= 1 && h <= total && h - 1 !== slide) go(h - 1) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [slide, total, go])

  // fullscreen + presenter timer
  useEffect(() => { const h = () => setFs(!!document.fullscreenElement); document.addEventListener('fullscreenchange', h); return () => document.removeEventListener('fullscreenchange', h) }, [])
  useEffect(() => {
    if (!presenter) return
    setElapsed(0)
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [presenter])

  const liveCtx = useMemo(() => ({ clicks, isStatic: false, registerMax }), [clicks, registerMax])
  const hasPrev = slide > 0 || clicks > 0
  const hasNext = slide < total - 1 || clicks < curMax
  const notes = (slides[slide]?.props as { notes?: string } | undefined)?.notes
  const nextSlide = slides[slide + 1]

  return (
    <MotionConfig reducedMotion="user">
      <div className="deck">
        <DeckCtx.Provider value={liveCtx}>
          <div className="slide-stage" key={slide}>{slides[slide]}</div>
        </DeckCtx.Provider>

        {drawing && <DrawCanvas key={slide} />}

        <aside className={'noir-rail' + (railOpen ? ' open' : '')}>
          <div className="noir-rail-head">
            <span className="noir-rail-title">Slides</span>
            <button className="noir-icon-btn sm" title="Close" onClick={() => setRailOpen(false)}><IconClose /></button>
          </div>
          <div className="noir-rail-list">
            {railOpen && slides.map((s, i) => (
              <button key={i} className={'noir-thumb' + (i === slide ? ' active' : '')} onClick={() => { go(i); setRailOpen(false) }}>
                <span className="noir-thumb-no">{i + 1}</span>
                <Thumb>{s}</Thumb>
              </button>
            ))}
          </div>
        </aside>

        {presenter && (
          <div className="noir-presenter">
            <div className="noir-presenter-row">
              <span className="noir-presenter-label">Presenter · {slide + 1} / {total}</span>
              <span className="noir-presenter-timer">{fmt(elapsed)}</span>
            </div>
            {nextSlide && <div className="noir-presenter-next"><Thumb>{nextSlide}</Thumb></div>}
            <div className="noir-presenter-notes">{notes}</div>
          </div>
        )}

        <div className="noir-dock">
          <div className="noir-bar">
            <button className={'noir-icon-btn' + (railOpen ? ' on' : '')} title="Overview (O)" onClick={() => setRailOpen((v) => !v)}><IconGrid /></button>
            <span className="noir-sep" />
            <button className="noir-icon-btn" title="Previous" disabled={!hasPrev} onClick={prev}><IconLeft /></button>
            <div className="noir-counter"><span className="noir-counter-now">{slide + 1}</span><span className="noir-counter-tot">/ {total}</span></div>
            <button className="noir-icon-btn" title="Next" disabled={!hasNext} onClick={next}><IconRight /></button>
            <span className="noir-sep" />
            <button className={'noir-icon-btn noir-optional' + (drawing ? ' on' : '')} title="Draw (D)" onClick={() => setDrawing((v) => !v)}><IconPencil /></button>
            <button className="noir-icon-btn" title="Fullscreen (F)" onClick={toggleFs}>{fs ? <IconShrink /> : <IconExpand />}</button>
            <button className={'noir-icon-btn noir-optional' + (presenter ? ' on' : '')} title="Presenter (P)" onClick={togglePresenter}><IconPresent /></button>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
