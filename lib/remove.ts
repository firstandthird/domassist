import find from './find';
import { DomSelector } from './types';

function remove(selector: DomSelector | DomSelector[], context?: HTMLElement | NodeList) {
  if (Array.isArray(selector)) {
    selector.forEach(item => remove(item, context));
    return;
  }

  const els = find(selector, context);

  if (els.length) {
    els.forEach(el => {
      el.remove();
    });
  }
}

export default remove;
