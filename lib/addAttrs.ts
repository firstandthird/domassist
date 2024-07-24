import find from './find';

function addAttrs(selector: HTMLElement[] | HTMLElement | NodeList | string, attrs: { [key: string]: string }): Array<HTMLElement> {
  if (Array.isArray(selector)) {
    selector.forEach((item) => addAttrs(item, attrs));
  }
  const els = find(selector);
  if (els.length) {
    els.forEach((item: HTMLElement) => {
      Object.keys(attrs).forEach((attr) => {
        if (attr in item) {
          item[attr] = attrs[attr];
        } else {
          item.dataset[attr] = attrs[attr];
        }
      });
    });
  }
  return els;
}

export default addAttrs;
