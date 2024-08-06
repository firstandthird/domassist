import find from './find';
import { DomSelector } from './types';

function removeClass(selector: DomSelector | DomSelector[], cls: string | string[]): HTMLElement[] {
  if (Array.isArray(selector)) {
    const x = [] as HTMLElement[];
    selector.forEach((item) => {
      x.concat(removeClass(item, cls));
    });
    return x;
  }
  const els = find(selector);
  if (els.length) {
    const clsArray = ([] as string[]).concat(cls);
    els.forEach((el) => {
      clsArray.forEach((item) => {
        el.classList.remove(item);
      });
    });
  }
  return els;
}

export default removeClass;
