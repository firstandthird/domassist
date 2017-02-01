import findOne from './findOne';

function find(selector, context = null) {
  if (selector instanceof HTMLElement) {
    return [selector];
  } else if (selector instanceof NodeList) {
    return [].slice.call(selector);
  } else if (typeof selector === 'string') {
    const startElement = (context) ? findOne(context) : document.body;
    return [].slice.call(startElement.querySelectorAll(selector));
  }
  return [];
}

export default find;
