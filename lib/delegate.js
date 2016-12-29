import on from './on';

function delegate(el, event, selector, cb, capture = false) {
  on(el, event, event => {
    if (event.target && event.target.matches(selector)) {
      cb(event);
    }
  }, capture);
}

export default delegate;