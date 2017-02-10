import matches from './matches';
import findOne from './findOne';

function closest(origin, selector) {
  const el = (selector instanceof HTMLElement) ? origin : findOne(origin);

  let parent = el.parentElement;
  while (parent.parentElement && !matches(parent, selector)) {
    parent = parent.parentElement;
  }
  return (matches(parent, selector)) ? parent : null;
}

export default closest;
