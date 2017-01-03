function matches(el, selector) {
  const proto = Element.prototype;
  let match = false;

  const prefixes = [
    'matches',
    'matchesSelector',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ];

  prefixes.forEach(prefix => {
    if (proto.hasOwnProperty(prefix)) {
      match = proto[prefix];
    }
  });

  if (match) {
    return match.call(el, selector);
  }
}

export default matches;
