# Accessibility Checklist

Use this checklist for every UI PR without changing visual design.

## Home sections baseline

- Landmarks are present (`header`, `main`, `section`, `footer`) and each major section has `aria-labelledby`.
- Heading hierarchy remains consistent (`h1` in hero, section headings use `h2`).
- Mobile navigation toggles expose `aria-expanded` and `aria-controls`.
- Interactive controls have explicit labels (`aria-label`) where text context is ambiguous.
- Keyboard interaction works (Tab order, Enter/Space for buttons, `Escape` closes modal-like menus).
- Form controls have linked labels (`htmlFor` / `id`) and proper `autocomplete`.
- Focus indicators stay visible for keyboard users.
- Motion behavior honors reduced-motion guardrails already defined in GSAP hooks.

## PR and release usage

- Add this checklist to PR validation notes.
- If a checklist item is intentionally skipped, document why in the PR.
- Treat any failed keyboard or labeling item as release-blocking for UI changes.

## Reference material

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
