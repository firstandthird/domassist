import matches from './matches';

function closest(el, selector) {
  if (matches(el, selector)) {
    return el;
  }
  let parent = el.parentElement ? el.parentElement : el.parentNode;
  while (parent.parentElement && !matches(parent, selector)) {
    parent = parent.parentElement;
  }
  return (matches(parent, selector)) ? parent : null;
}

export default closest;
