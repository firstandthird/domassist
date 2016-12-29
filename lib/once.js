import on from './on';
import off from './off';

function once(el, event, cb, capture = false) {
  on(el, event, event => {
    cb(event);
    off(el, event);
  }, capture);
}

export default once;