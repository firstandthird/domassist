import find from './find';

function off(selector, event) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => off(item, event));
  }
  if (!window._domassistevents || !window._domassistevents[`_${event}`]) {
    return;
  }

  // only disable events that were registered with domassist.on,
  // don't de-register events that were registered by other libs:
  const data = window._domassistevents[`_${event}`];
  const el = find(selector);
  if (el.length) {
    el.forEach((item) => {
      item.removeEventListener(event, data.cb, data.capture);
    });
  }
}

export default off;
