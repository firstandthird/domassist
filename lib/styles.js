import toArray from './toArray';

function styles(els, css) {
  toArray(els).forEach((el) => {
    Object.keys(css).forEach((key) => {
      el.style[key] = css[key];
    });
  });
}

export default styles;
