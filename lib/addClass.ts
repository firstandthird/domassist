import type { DomSelector } from './types';
import find from './find';

function addClass(selector: DomSelector | DomSelector[], cls: string | string[]): HTMLElement[] {
  if (Array.isArray(selector)) {
    selector.forEach((item) => addClass(item, cls));
    return [];
  }
  const els = find(selector);
  if (els.length) {
    const clsArray = ([] as string[]).concat(cls);
    els.forEach((el) => {
      clsArray.forEach((item) => {
        el.classList.add(item);
      });
    });
  }
  return els;
}

export default addClass;
