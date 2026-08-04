/**
 * Before / After Transformations — selectable service tabs + drag slider (#transformations)
 */
document.addEventListener('DOMContentLoaded', () => {
  const tabsWrap = document.querySelector('[data-ba-tabs]');
  const sliderFrame = document.querySelector('[data-ba-frame]');
  const handle = document.querySelector('[data-ba-handle]');
  if (!tabsWrap || !sliderFrame || !handle) return;

  const beforeImg = sliderFrame.querySelector('[data-ba-before]');
  const afterImg = sliderFrame.querySelector('[data-ba-after]');
  const titleEl = document.querySelector('[data-ba-title]');
  const taglineEl = document.querySelector('[data-ba-tagline]');
  const tabs = Array.from(tabsWrap.querySelectorAll('[data-ba-service]'));

  // Placeholder imagery — every service points at the same before/after pair
  // for now; swap each entry's before/after path individually once real
  // clinical photos are ready.
  const services = {
    orthodontics: {
      title: 'Orthodontics',
      tagline: 'Full Arch Alignment',
      before: 'images/root_canal_before.png',
      after: 'images/root_canal_after.png'
    },
    aligners: {
      title: 'Clear Aligners',
      tagline: 'Invisible Tray Straightening',
      before: 'images/root_canal_before.png',
      after: 'images/root_canal_after.png'
    },
    implants: {
      title: 'Dental Implants',
      tagline: 'Restored Missing Teeth',
      before: 'images/root_canal_before.png',
      after: 'images/root_canal_after.png'
    },
    cosmetic: {
      title: 'Cosmetic Dentistry',
      tagline: 'Veneers & Whitening',
      before: 'images/root_canal_before.png',
      after: 'images/root_canal_after.png'
    },
    general: {
      title: 'General Dentistry',
      tagline: 'Root Canal Therapy',
      before: 'images/root_canal_before.png',
      after: 'images/root_canal_after.png'
    },
    'smile-makeover': {
      title: 'Smile Makeovers',
      tagline: 'Complete Smile Transformation',
      before: 'images/root_canal_before.png',
      after: 'images/root_canal_after.png'
    }
  };

  let active = 'orthodontics';
  let pos = 50;
  let dragging = false;

  function setPosition(value) {
    pos = Math.min(100, Math.max(0, value));
    sliderFrame.style.setProperty('--ba-pos', pos + '%');
    handle.setAttribute('aria-valuenow', String(Math.round(pos)));
  }

  function applyService(id) {
    const data = services[id];
    if (!data) return;
    active = id;

    beforeImg.src = data.before;
    beforeImg.alt = data.title + ' before treatment';
    afterImg.src = data.after;
    afterImg.alt = data.title + ' after treatment';
    if (titleEl) titleEl.textContent = data.title;
    if (taglineEl) taglineEl.textContent = data.tagline;
    handle.setAttribute('aria-label', 'Drag to compare ' + data.title + ' before and after images');

    tabs.forEach((tab) => {
      const isActive = tab.getAttribute('data-ba-service') === id;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-ba-service');
      if (id === active) return;
      applyService(id);
      setPosition(50);
    });
  });

  // Drag interaction (mouse, touch & pen unified via Pointer Events)
  function positionFromEvent(e) {
    const rect = sliderFrame.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    return x;
  }

  function onPointerMove(e) {
    if (!dragging) return;
    setPosition(positionFromEvent(e));
  }

  function stopDragging() {
    dragging = false;
  }

  handle.addEventListener('pointerdown', (e) => {
    dragging = true;
    handle.setPointerCapture(e.pointerId);
    handle.focus();
  });
  handle.addEventListener('pointermove', onPointerMove);
  handle.addEventListener('pointerup', stopDragging);
  handle.addEventListener('pointercancel', stopDragging);

  // Clicking/dragging anywhere on the frame also moves the slider.
  sliderFrame.addEventListener('pointerdown', (e) => {
    if (e.target === handle || handle.contains(e.target)) return;
    setPosition(positionFromEvent(e));
    dragging = true;
    sliderFrame.setPointerCapture(e.pointerId);
  });
  sliderFrame.addEventListener('pointermove', onPointerMove);
  sliderFrame.addEventListener('pointerup', stopDragging);
  sliderFrame.addEventListener('pointercancel', stopDragging);

  handle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPosition(pos - 5); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPosition(pos + 5); }
    else if (e.key === 'Home') { e.preventDefault(); setPosition(0); }
    else if (e.key === 'End') { e.preventDefault(); setPosition(100); }
  });

  applyService('orthodontics');
  setPosition(50);
});
