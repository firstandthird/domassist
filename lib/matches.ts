function matches(el: HTMLElement | null, selector: HTMLElement | string): boolean | null {
  if (el) {
    if (selector instanceof HTMLElement) {
      return el === selector;
    } else if (typeof selector === 'string') {
      return el.matches(selector);
    }
  }
  return null;
}

export default matches;
