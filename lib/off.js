import find from './find';
import idStorage from './idStorage';

function off(selector, event, handler) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => off(item, event, handler));
  }

  // ID
  if (typeof selector === 'string' && typeof event === 'undefined') {
    const data = idStorage.removeFromID(selector);

    if (!data) {
      return;
    }

    return off(data.el, data.event, data.handler);
  }

  const el = find(selector);

  if (el.length) {
    el.forEach((item) => {
      item.removeEventListener(event, handler);
      idStorage.removeFromValue({
        el: item,
        event,
        handler
      });
    });
  }
}

export default off;
