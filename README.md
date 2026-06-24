# Bolt deck skills

Bolt skills for building premium presentation decks, following the Agent Skills
`skills/*/SKILL.md` convention. Each skill lives in `skills/<name>/` with a
`SKILL.md` (the authoring guide) and an `assets/` template Bolt copies verbatim.

## Skills

- **[`skills/slides/`](./skills/slides)** — premium [Slidev](https://sli.dev) decks:
  a fixed, hand-tuned navigation UI + a bespoke theme designed per request.
  `assets/` is a complete, ready-to-run Slidev project (chrome, layouts,
  components, CSS).

## Add it in Bolt

1. In Bolt's **Add skill from GitHub**, paste this repo's URL —
   `https://github.com/inkko44/bolt-slides-skill`.
2. The skill is auto-discovered at `skills/slides/SKILL.md` (folder name `slides`).
3. Tell Bolt to use the `slides` skill and build a deck about your topic/brand.

Per `skills/slides/SKILL.md`, Bolt copies the `assets/*` to the project root, edits
only the `:root` token block to theme it, deletes the throwaway starter `slides.md`,
and authors the real deck. `npm install && npm run dev` serves it on `:3030`.

> The whole look re-themes by editing one `:root` block in
> `skills/slides/assets/styles/index.css`. The navigation chrome
> (`skills/slides/assets/global-bottom.vue`) is locked — copied byte-for-byte.
