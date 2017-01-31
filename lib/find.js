function find(selector, context = null) {
  let els = [];
  if (selector instanceof HTMLElement) {
    els.push(selector);
  } else if (typeof selector === 'string') {
    const startElement = (context) ? find(context) : [document.body];
    els = [].slice.call(startElement[0].querySelectorAll(selector));
  }
  return els;
}

export default find;
