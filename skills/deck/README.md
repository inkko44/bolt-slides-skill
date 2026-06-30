# deck — responsive React presentation engine + component gallery

A local engine for building and previewing premium presentation components. The
runnable app lives in **`assets/`**.

## Run it

```bash
cd assets
npm install
npm run dev
```

- **`/`** → the **component gallery** (a live preview of every component).
- **`/#deck`** → the **deck demo** (the full paged presentation). Browser-back
  returns you to the gallery.

`npm run build` type-free-bundles a production build; `npm run preview` serves it.

## Where things live (in `assets/src/`)

| Path | What |
| --- | --- |
| `components/` | The building-block components — CountUp, TiltCard, Marquee, Bento, Split, StatGrid, VisualDashboard, Accordion, Comparison, Tabs, Timeline, CodeWindow, BrowserFrame, Charts (Bar/Line/Donut), SpotlightCard. **Add new ones here.** |
| `deck/` | The presentation engine + chrome — `Deck` (paged nav, dock, rail, presenter, draw, auto-play), `Slide`, `Build` (click/auto reveals), `Reveal`, `DeckContext`, `icons`. |
| `styles/tokens.css` | The `:root` design tokens — **edit this to re-theme everything** (color, type, radius, depth, motion). |
| `styles/base.css` | Responsive base, atmosphere, motion, and the dock/rail chrome CSS. |
| `styles/gallery.css` | Styles for the gallery surface only. |
| `Gallery.tsx` | The component gallery. |
| `App.tsx` | The deck demo (composed from `<Slide>`/`<Bento>`/… ). |

## Add a component

1. Create it in `src/components/MyThing.tsx`. Use `var(--…)` tokens (no raw hex);
   for on-scroll/auto motion, read `useDeck()` and copy the pattern in
   `CountUp.tsx` / `VisualDashboard.tsx`.
2. Preview it: open `src/Gallery.tsx` and add an entry in a section —
   `<Swatch title="<MyThing />"><MyThing /></Swatch>` for a widget, or
   `<Frame title="<MySlide />"><MySlide /></Frame>` for a full-slide layout.
   (There's an `ADD NEW COMPONENT PREVIEWS HERE` marker at the bottom.)
3. Use it in a deck via `App.tsx`.

> The gallery renders components with motion live (count-ups run, builds stagger,
> the dashboard draws) and renders full-slide components in faithful, scaled
> mini-frames. Theme everything by editing `styles/tokens.css`.
