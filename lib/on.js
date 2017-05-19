import find from './find';
import idStorage from './idStorage';

function on(selector, event, handler, capture = false) {
  if (Array.isArray(selector)) {
    return Array.prototype.concat.apply([],
      selector.map(item => on(item, event, handler, capture)));
  }

  const el = find(selector);
  let ids = null;

  if (el.length) {
    ids = el.map(item => {
      item.addEventListener(event, handler);

      return idStorage.add({
        el: item,
        event,
        handler,
        capture
      });
    });

    if (ids.length === 1) {
      ids = ids[0];
    }
  }

  return ids;
}

export default on;
