document.addEventListener('DOMContentLoaded', () => {
  const cursorGlow = document.querySelector('.cursor-glow');
  if (!cursorGlow) return;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouchDevice || prefersReducedMotion) {
    return;
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let active = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!active) {
      cursorGlow.style.opacity = '1';
      currentX = targetX;
      currentY = targetY;
      active = true;
      requestAnimationFrame(updateGlowPosition);
    }
  });

  window.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
    active = false;
  });

  function updateGlowPosition() {
    if (!active) return;

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    cursorGlow.style.transform = `translate3d(calc(${currentX}px - 50%), calc(${currentY}px - 50%), 0)`;

    requestAnimationFrame(updateGlowPosition);
  }
});
