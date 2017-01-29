import toArray from './toArray';

function mapEls(arr, fn) {
  arr.forEach((set) => {
    const els = toArray(set.shift());
    if (!els) {
      return;
    }
    els.forEach((el) => {
      fn(el, ...set);
    });
  });
}

export default mapEls;
