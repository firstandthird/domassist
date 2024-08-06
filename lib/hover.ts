import on from './on';
import { DomSelector } from './types';

function hover(el: DomSelector | DomSelector[], enter: (e: Event) => void, exit: (e: Event) => void) {
  on(el, 'mouseenter', enter);
  on(el, 'mouseleave', exit);
}

export default hover;
