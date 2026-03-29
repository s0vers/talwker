# Talkwer — design memory (project reference)

Copy the block below into **Cursor Settings → Rules → Memory** if you want the same facts in global AI memory.

---

**Talkwer** is a static Next.js 16 travel magazine site. The live homepage is `src/components/pages/HomePage.tsx`: dark backgrounds (`#050505` / `#0a0a0a`), white type with opacity for hierarchy, **orange-500** as the single accent (logo dot `talkwer.`, CTAs, highlights). Layout: **`.pad-x`** horizontal padding and **`max-w-[1600px]`** for main shell; Inter from `src/app/layout.tsx`. Typography: editorial uppercase nav with wide letter-spacing (`text-[11px]`–`13px`, `tracking-[0.15em]`–`0.2em]`); hero uses **clamp** fluid display type. Motion: **GSAP + ScrollTrigger** via `@/lib/useGsap` — always use **`prefersReducedMotion()`** guard and **`gsap.context` + revert**. UI primitives use **shadcn** tokens in `src/app/globals.css` (Tailwind v4 `@theme inline` + `:root` / `.dark` CSS variables; `cn()` from `@/lib/utils`); marketing sections on the dark home favor **orange** + neutrals, not a second accent. **BasicLayout / HeroSection** use a separate Voyager + sky-500 palette — do not mix into the main Talkwer home unless explicitly switching templates.

---

## Quick token reference

| Role | Typical classes / tokens |
|------|---------------------------|
| Page bg | `bg-[#050505]`, `bg-[#0a0a0a]` |
| Muted text | `text-white/40`, `text-white/25`, `text-white/15` |
| Accent | `text-orange-500`, `bg-orange-500`, borders `border-orange-500` |
| Dividers | `border-white/[0.06]` |
| Horizontal padding | class **`pad-x`** |
| Gradient text utility | `.text-gradient` (primary → accent → secondary in `globals.css`) |

## Study material (for maintainers)

- [Tailwind CSS — theme](https://tailwindcss.com/docs/theme) — `@theme`, `@plugin`, custom variants.
- [shadcn/ui — Theming](https://ui.shadcn.com/docs/theming) — CSS variables and `dark` class.
- [GSAP — ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — scrub, context cleanup.
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — accessibility for animation.
- [Next.js Image](https://nextjs.org/docs/app/building-your-application/optimizing/images) — `sizes`, `priority`.
