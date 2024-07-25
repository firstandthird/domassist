import type { DomSelector } from './types';
import find from './find';

function addAttrs(selector: DomSelector | DomSelector[], attrs: { [key: string]: string }): HTMLElement[] {
  if (Array.isArray(selector)) {
    if (selector.length) {
      selector.forEach((item) => addAttrs(item, attrs));
    }
    return [];
  } 
  const els = find(selector);
  if (els.length) {
    els.forEach((item) => {
      Object.keys(attrs).forEach((attr) => {
        if (item.hasAttribute(attr)) {
          item.setAttribute(attr, attrs[attr]);
        } else {
          item.dataset[attr] = attrs[attr];
        }
      });
    });
  }
  return els;
}

export default addAttrs;