import findOne from './findOne';
import isWindow from './isWindow';

function find(selector, context = null) {
  if (selector instanceof HTMLElement || isWindow(selector)) {
    return [selector];
  } else if (selector instanceof NodeList) {
    return [].slice.call(selector);
  } else if (typeof selector === 'string') {
    const startElement = (context) ? findOne(context) : document;
    return [].slice.call(startElement.querySelectorAll(selector));
  }
  return [];
}

export default find;
