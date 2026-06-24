# slides — premium Slidev decks for Bolt

A Bolt skill that builds presentation-grade [Slidev](https://sli.dev) decks with a
fixed, hand-tuned navigation UI and a bespoke theme designed per request.

## What's here

- **[`SKILL.md`](./SKILL.md)** — the authoring guide. The instructions Bolt follows
  to theme + author a deck.
- **`assets/`** — a complete, ready-to-run Slidev project (navigation chrome,
  layouts, components, CSS). **These are copied verbatim**; they're what makes every
  deck look polished and identical across decks.

## Use it in Bolt

1. Import this repo into Bolt (so the `assets/` folder arrives intact — that's the
   point of syncing via git rather than pasting).
2. Tell Bolt to **follow `SKILL.md`** and build a deck about your topic/brand.
3. Per `SKILL.md`, Bolt copies `assets/*` to the project root, edits only the
   `:root` token block to theme it, deletes the throwaway `assets/slides.md`, and
   authors the real deck. `npm install && npm run dev` serves it on `:3030`.

> The whole look re-themes by editing one `:root` block in `assets/styles/index.css`.
> The navigation chrome (`assets/global-bottom.vue`) is locked — copied byte-for-byte.
