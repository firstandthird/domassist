import type { DomSelector } from './types';
import find from './find';

function addClass(selector: DomSelector | DomSelector[], cls: string | string[]): HTMLElement[] {
  if (Array.isArray(selector)) {
    const x = [] as HTMLElement[];
    selector.forEach((item) => {
      x.concat(addClass(item, cls));
    });
    return x;
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
