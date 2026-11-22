# Portfolio design

Use Vinod’s existing compact personal portfolio as the design reference. The site serves people reviewing his engineering work and deciding whether to contact him.

- Keep Lenia as the default and offer Instrument Sans, Bricolage Grotesque, and Spectral as persistent site-wide choices. Preserve the signature, restrained violet accent, Batman artwork and reversible monochrome theme reveal, navbar aurora, and detailed GitHub card.
- Use one plain page background, shared neutral surfaces, hairline edges, a consistent type scale, and the same content width across routes. Shared values live in `app/globals.css` as `--site-*` tokens.
- Put a concise introduction, contact, résumé, and real work near the top. Keep the longer personal story available through a native disclosure.
- Show genuine project screens and documented engineering decisions. Use existing data and published case studies. Keep external embeds and media behind an action.
- Use colour for an active choice, a meaningful icon, or a data series. The aurora is an intentional light effect. The Batman art and GitHub visual retain their individual character.
- Build controls with the existing Radix primitives or native HTML. Keep keyboard focus, touch targets, dark mode, reduced motion, and loading states usable.
- Motion follows an action. The Batman card also offers the existing theme transition. Keep the original centered 1.5× Batman image zoom with 700 ms timing inside a fixed frame. Keep the footer’s original changing emoji on its 500 ms interval. Avoid scroll reveals that delay content and hover effects that move surrounding content.
- The theme reveal uses the original `/images/batman.svg` asset unchanged, including the flying bats. Prepare it after first paint or on interaction intent and decode it before starting the reveal. Preserve rapid reversal and the monochrome inverse themes.

The `kshv-taste` skill informs these decisions through the existing visual language.

Freelance follows the original page’s serif accents, deliberate light treatments, interactive service selection, and personal founder portrait. Projects and writing use actual product screens as visual storytelling. Header grain remains subtle and limited to the navigation surface.

Selected projects is an image-led, unboxed viewer: one horizontal text index, the real product preview, and a short caption with useful links. Avoid simulated window controls, address bars, view-mode toolbars, counters, repeated actions, and nested card frames. Case studies carry the engineering detail; projects without screenshots show their documented build steps. Static tech names use plain inline lists. The reference research is Paco Coursey’s and Rauno Freiberg’s personal sites; apply their restraint through this portfolio’s existing visual language.

Pending a user choice, `/design` presents four independent project layouts and three logo-based tech-stack layouts, each with a full-size review link. Do not adopt one on the homepage until Vinod chooses. Coding time receives interaction refinements directly while preserving its real data and proportions.
