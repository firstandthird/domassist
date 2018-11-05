import matches from './matches';

function closest(el, selector) {
  if (el) {
    let parent = el.tagName.toLowerCase() === 'svg' ? el.parentNode : el.parentElement;
    while (parent.parentElement && !matches(parent, selector)) {
      parent = parent.parentElement;
    }
    return (matches(parent, selector)) ? parent : null;
  }
  // eslint-disable-next-line no-console
  console.warn("The give element don't exist");
  return null;
}

export default closest;
