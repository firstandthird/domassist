import find from './find';

function removeClass(selector, cls) {
  if (Array.isArray(selector)) {
    return selector.forEach((item) => removeClass(item, cls));
  }

  const els = find(selector);
  if (els.length) {
    els.forEach((el) => {
      const clsArray = [].concat(cls);
      clsArray.forEach((item) => {
        el.classList.remove(item);
      });
    });
    return els;
  }
}

export default removeClass;
