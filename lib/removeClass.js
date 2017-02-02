import find from './find';

function removeClass(selector, cls) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => removeClass(item, cls));
  }

  const els = find(selector);
  if (els.length) {
    els.forEach((el) => {
      if (Array.isArray(cls)) {
        cls.forEach((item) => {
          el.classList.remove(item);
        });
      } else {
        el.classList.remove(cls);
      }
    });
    return els;
  }
}

export default removeClass;
