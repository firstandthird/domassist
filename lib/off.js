import find from './find';

function off(selector, event, capture = false) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => off(item, event, capture));
  }
  if (!window._domassistevents) {
    window._domassistevents = {};
  }

  const data = window._domassistevents[`_${event}`];

  if (!data) {
    return;
  }
  const el = find(selector);
  if (el.length) {
    el.forEach((item) => {
      item.removeEventListener(event, data.cb, data.capture);
    });
  }
}

export default off;
