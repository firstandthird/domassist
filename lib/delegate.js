import on from './on';
import matches from './matches';

function delegate(el, event, selector, cb, capture = false) {
  on(el, event, e => {
    if (e.target && matches(e.target, selector)) {
      return cb(e);
    }
  }, capture);
}

export default delegate;
