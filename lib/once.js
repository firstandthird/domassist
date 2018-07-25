import on from './on';
import off from './off';

function once(selector, event, run, capture = false) {
  on(selector, event, e => {
    off(selector, event, capture);
    run(e);
  }, capture);
}

export default once;
