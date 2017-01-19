import matches from './matches';

function closest(el, selector) {
  let parent = el.parentElement;
  while (parent.parentElement && !matches(parent, selector)) {
    parent = parent.parentElement;
  }
  return (matches(parent, selector)) ? parent : null;
}

export default closest;