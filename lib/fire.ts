import find from './find';
import { DomSelector } from './types';

function fire(selector: DomSelector | DomSelector[], type: string, params = {bubbles: true}): HTMLElement[] {
  if (Array.isArray(selector)) {
    const x = [] as HTMLElement[];
    selector.forEach((item) => {
      x.concat(fire(item, type, params));
    });
    return x;
  }

  const els = find(selector);
  if (els.length) {
    els.forEach(el => {
      const event = new CustomEvent(type, params);
      el.dispatchEvent(event);
    });
    return els;
  }
  return [];
}

export default fire;
