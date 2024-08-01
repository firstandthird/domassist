import type { DomSelector } from './types';
import find from './find';

function findOne(selector: DomSelector, el?: HTMLElement | NodeList) {
  const found = find(selector, el);

  if (found.length) {
    return found[0];
  }

  return null;
}

export default findOne;
