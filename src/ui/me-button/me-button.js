/**
 * File: src/ui/me-button/me-button.js
 * Minimal behavior for toggleable buttons:
 * Usage: <button class="me-button" data-toggle="true" aria-pressed="false">...</button>
 */
export function initMeButtons(root = document) {
  const toggles = root.querySelectorAll('.me-button[data-toggle="true"]');
  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
    });
  });
}

// Auto-init if directly included
if (typeof window !== 'undefined') {
  window.requestAnimationFrame(() => initMeButtons());
}
