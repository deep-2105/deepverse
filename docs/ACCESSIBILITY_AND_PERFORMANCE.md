# Accessibility and Performance Practices

DeepVerse should remain usable when decorative effects are unavailable or reduced.

## Accessibility

- Use semantic buttons and links for interactive controls.
- Keep navigation keyboard-accessible.
- Provide meaningful alternative text for informative images.
- Ensure visible focus states and readable contrast.
- Respect the `prefers-reduced-motion` media preference.
- Do not rely on sound or animation to communicate essential information.

## Performance

- Prefer static assets and short CSS transitions for decorative presentation.
- Animate `transform` and `opacity` rather than layout properties.
- Avoid unnecessary polling, duplicate timers, and continuously running render loops.
- Pause nonessential effects when the page is hidden or the relevant section is offscreen.
- Use appropriately sized, compressed images and lazy-load below-the-fold media.
- Keep core navigation and project content functional without decorative effects.

## Mobile

Treat touch devices and narrow viewports as first-class layouts. Avoid hover-only interactions, custom mouse cursors on touch screens, and effects that create horizontal page overflow.
