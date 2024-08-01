import findOne from './findOne';
import { DomSelector } from './types';

function hasClass(selector: DomSelector, cls: string): boolean {
  const el = findOne(selector);
  if (!el) {
    return false;
  }
  return el.classList.contains(cls);
}

export default hasClass;
