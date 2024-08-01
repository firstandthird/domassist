import matches from './matches';

function closest(el: HTMLElement | null, selector: HTMLElement | string) {
  do {
    if (matches(el, selector)) {
      return el;
    }

    el = el?.parentElement || null;
  } while (el !== null && el.nodeType === 1);

  return null;
}

export default closest;
