function find(selector, context = null) {
  if (selector instanceof HTMLElement) {
    return [selector];
  } else if (selector instanceof NodeList) {
    return [].slice.call(selector);
  } else if (typeof selector === 'string') {
    const startElement = (context) ? find(context) : [document.body];
    return [].slice.call(startElement[0].querySelectorAll(selector));
  }
  return [];
}

export default find;
