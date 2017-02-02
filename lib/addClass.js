import find from './find';

function addClass(selector, cls) {
  if (Array.isArray(selector)) {
    return selector.forEach((item) => addClass(item, cls));
  }
  const els = find(selector);
  if (els.length) {
    els.forEach((el) => {
      if (Array.isArray(cls)) {
        cls.forEach((item) => {
          el.classList.add(item);
        });
      } else {
        el.classList.add(cls);
      }
    });
    return els;
  }
}

export default addClass;
