# Portfolio design

Use Vinod’s existing compact personal portfolio as the design reference. The site serves people reviewing his engineering work and deciding whether to contact him.

- Keep Lenia, the signature, the restrained violet accent, the Batman artwork, the reversible monochrome theme reveal, the navbar aurora, and the detailed GitHub card.
- Use one plain page background, shared neutral surfaces, hairline edges, a consistent type scale, and the same content width across routes. Shared values live in `app/globals.css` as `--site-*` tokens.
- Put a concise introduction, contact, résumé, and real work near the top. Keep the longer personal story available through a native disclosure.
- Show genuine project screens and documented engineering decisions. Use existing data and published case studies. Keep external embeds and media behind an action.
- Use colour for an active choice, a meaningful icon, or a data series. The aurora is an intentional light effect. The Batman art and GitHub visual retain their individual character.
- Build controls with the existing Radix primitives or native HTML. Keep keyboard focus, touch targets, dark mode, reduced motion, and loading states usable.
- Motion follows an action. The Batman card also offers the existing theme transition. Avoid scroll reveals that delay content, hover effects that move surrounding content, and continuous decorative timers.

The `kshv-taste` skill informs these decisions through the existing visual language.
