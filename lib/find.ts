function find(selector: HTMLElement | NodeList | string, context?: HTMLElement | NodeList): HTMLElement[] {
  if (selector instanceof HTMLElement) {
    return [selector];
  } else if (selector instanceof NodeList) {
    return [].slice.call(selector);
  } else if (typeof selector === 'string') {
    const startElement: HTMLElement | Document = (context) ? find(context)[0] : document;
    return [].slice.call(startElement.querySelectorAll(selector));
  }
  return [];
}

export default find;
