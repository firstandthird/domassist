import matches from './matches';

function closest(el, selector) {
  if (matches(el, selector)) {
    return el;
  }
  let parent = el.tagName.toLowerCase() === 'svg' ? el.parentNode : el.parentElement;
  while (parent.parentElement && !matches(parent, selector)) {
    parent = parent.parentElement;
  }
  return (matches(parent, selector)) ? parent : null;
}

export default closest;
