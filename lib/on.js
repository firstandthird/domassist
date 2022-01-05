import find from './find';

function on(selector, event, cb, capture = false) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => on(item, event, cb, capture));
    return;
  }

  // scrolling events need the passive listener attached
  // to satisfy SEO scrolling measurements:
  if (['touchstart', 'touchmove', 'wheel', 'mousewheel', 'scroll'].indexOf(event) !== -1) {
    if (capture === false) {
      capture = { passive: true };
    }
    if (capture === true) {
      capture = { passive: true, capture: true };
    }
    if (typeof capture === 'object') {
      capture.passive = true;
    }
  }

  // _domassistevents keeps track of events we registered
  // with 'domassist.on' so they can be deregistered by
  // 'domassist.off' without affecting events registered
  // by other libraries:
  if (!window._domassistevents) {
    window._domassistevents = {};
  }
  window._domassistevents[`_${event}`] = {
    cb,
    capture
  };

  const el = find(selector);
  if (el.length) {
    el.forEach((item) => {
      item.addEventListener(event, cb, capture);
    });
  }
}

export default on;
