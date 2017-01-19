import addClass from './addClass';
import removeClass from './removeClass';
import hasClass from './hasClass';

function toggleClass(el, value) {
  if (hasClass(el, value)) {
    removeClass(el, value);
  } else {
    addClass(el, value);
  }
}

export default toggleClass;
