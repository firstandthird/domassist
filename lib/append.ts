import type { DomSelector } from './types';
import find from './find';

function append(selector: DomSelector | DomSelector[], value: string | HTMLElement | Node) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => append(item, value));
    return;
  }
  const els = find(selector);
  if (els.length) {
    els.forEach((el) => {
      if (typeof value === 'string') {
        el.insertAdjacentHTML('beforeend', value);
      } else {
        el.appendChild(value);
      }
    });
  }
}

export default append;
