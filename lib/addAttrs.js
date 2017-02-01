import find from './find';

function addAttrs(selector, attrs) {
  if (Array.isArray(selector)) {
    selector.forEach((item) => addAttrs(item, attrs));
  }
  const el = find(selector);
  if (el.length) {
    el.forEach((item) => {
      Object.keys(attrs).forEach((attr) => {
        if (attr in item) {
          item[attr] = attrs[attr];
        } else {
          item.dataset[attr] = attrs[attr];
        }
      });
    });
  }
}

export default addAttrs;
