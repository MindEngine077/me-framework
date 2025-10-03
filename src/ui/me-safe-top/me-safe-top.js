/**
 * File: src/ui/me-safe-top/me-safe-top.js
 * Minimal behavior scaffold.
 */
export function initMeSafeTop(root = document) {
  const nodes = root.querySelectorAll('.me-safe-top[data-toggle="true"]');
  nodes.forEach((el) => {
    el.addEventListener('click', () => {
      const pressed = el.getAttribute('aria-pressed') === 'true';
      el.setAttribute('aria-pressed', String(!pressed));
    });
  });
}
if (typeof window !== 'undefined') {
  window.requestAnimationFrame(() => initMeSafeTop());
}
