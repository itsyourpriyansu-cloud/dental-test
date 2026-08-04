/**
 * BA Section — Fluid Mouse Ripple Background
 * Canvas-based fluid color ripple that responds to mouse movement.
 * Paints soft glowing orbs that expand and fade on a deep navy base.
 */

(function () {
  const section = document.getElementById('transformations');
  if (!section) return;

  /* ── Canvas setup ── */
  const canvas = document.createElement('canvas');
  canvas.style.cssText = [
    'position:absolute',
    'inset:0',
    'width:100%',
    'height:100%',
    'pointer-events:none',
    'z-index:0',
    'display:block',
  ].join(';');

  section.style.position = 'relative';
  section.insertBefore(canvas, section.firstChild);

  const ctx = canvas.getContext('2d');

  /* Ensure all direct children sit above canvas */
  Array.from(section.children).forEach(el => {
    if (el !== canvas) {
      el.style.position = 'relative';
      el.style.zIndex = '1';
    }
  });

  /* ── Resize ── */
  function resize() {
    const r = section.getBoundingClientRect();
    canvas.width  = r.width;
    canvas.height = r.height;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── Ripple pool ── */
  const ripples = [];
  const MAX_RIPPLES = 14;

  /* Brand-aligned colour palette */
  const COLORS = [
    [37,  99, 235],   /* blue-600   */
    [14, 165, 233],   /* sky-500    */
    [56, 189, 248],   /* sky-400    */
    [99, 102, 241],   /* indigo-500 */
    [11,  70, 150],   /* brand-deep */
    [6,  182, 212],   /* cyan-500   */
  ];

  function spawnRipple(x, y) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    ripples.push({
      x, y,
      r: 0,
      maxR: 160 + Math.random() * 130,
      alpha: 0.26 + Math.random() * 0.18,
      color,
      speed: 2.0 + Math.random() * 1.8,
    });
    if (ripples.length > MAX_RIPPLES) ripples.shift();
  }

  /* ── Mouse tracking ── */
  let lastSpawn = 0;

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    if (now - lastSpawn > 75) {
      spawnRipple(x, y);
      lastSpawn = now;
    }
  });

  /* ── Ambient background orbs (always on) ── */
  const ambientOrbs = [
    { x: 0.18, y: 0.28, r: 0.38, color: [37,  99, 235], alpha: 0.13, phase: 0.0  },
    { x: 0.80, y: 0.72, r: 0.32, color: [14, 165, 233], alpha: 0.10, phase: 2.1  },
    { x: 0.52, y: 0.50, r: 0.42, color: [11,  70, 150], alpha: 0.15, phase: 4.3  },
  ];

  /* ── Render loop ── */
  function draw(ts) {
    const W = canvas.width;
    const H = canvas.height;

    /* Navy base */
    ctx.fillStyle = '#081B43';
    ctx.fillRect(0, 0, W, H);

    /* Slow drifting ambient orbs */
    const t = ts * 0.00035;
    ambientOrbs.forEach(orb => {
      const cx = (orb.x + Math.sin(t + orb.phase) * 0.06) * W;
      const cy = (orb.y + Math.cos(t * 0.65 + orb.phase) * 0.04) * H;
      const radius = orb.r * Math.max(W, H);
      const [r, g, b] = orb.color;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0,  `rgba(${r},${g},${b},${orb.alpha})`);
      grad.addColorStop(1,  `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    });

    /* Mouse ripples */
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r    += rp.speed;
      rp.alpha -= rp.alpha * 0.020;   /* exponential fade */

      if (rp.alpha < 0.004) { ripples.splice(i, 1); continue; }

      const [r, g, b] = rp.color;
      const grad = ctx.createRadialGradient(rp.x, rp.y, 0, rp.x, rp.y, rp.r);
      grad.addColorStop(0,   `rgba(${r},${g},${b},${rp.alpha})`);
      grad.addColorStop(0.45, `rgba(${r},${g},${b},${(rp.alpha * 0.38).toFixed(4)})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();
