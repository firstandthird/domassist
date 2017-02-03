import find from './find';

function addClass(selector, cls) {
  if (Array.isArray(selector)) {
    return selector.forEach((item) => addClass(item, cls));
  }
  const els = find(selector);
  if (els.length) {
    els.forEach((el) => {
      const clsArray = [].concat([], cls);
      clsArray.forEach((item) => {
        el.classList.add(item);
      });
    });
    return els;
  }
}

export default addClass;
