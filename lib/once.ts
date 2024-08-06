import on from './on';
import off from './off';
import { DomSelector } from './types';

function once(el: DomSelector | DomSelector[], event: string, run: (e: Event) => void, capture = false) {
  on(el, event, e => {
    off(el, event);
    run(e);
  }, capture);
}

export default once;
