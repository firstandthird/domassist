import find from './find';
import { DomSelector } from './types';

function styles(selector: DomSelector | DomSelector[], css: { [key: string]: string | null; }) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => styles(item, css));
    return;
  }
  const els = find(selector);
  if (els.length) {
    els.forEach((el) => {
      Object.keys(css).forEach((key) => {
        (el.style as { [key: string]: any })[key] = css[key];
      });
    });
  }
}

export default styles;
