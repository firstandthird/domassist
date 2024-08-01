import find from './find';
import { DomSelector } from './types';

function html(selector: DomSelector | DomSelector[], value: string) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => html(item, value));
  } else {
    const el = find(selector);
    if (el.length) {
      const length = el.length;
      for (let i = 0; i < length; i += 1) {
        el[i].innerHTML = value;
      }
    }
  }
}

export default html;
