import find from './find';
import idStorage from './idStorage';

function on(selector, event, handler) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => on(item, event, handler));
    return;
  }

  const el = find(selector);
  let ids = null;

  if (el.length) {
    ids = el.map(item => {
      item.addEventListener(event, handler);

      return idStorage.add({
        el: item,
        event,
        handler
      });
    });

    if (ids.length === 1) {
      ids = ids[0];
    }
  }

  return ids;
}

export default on;
