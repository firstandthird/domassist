import domassist from '../domassist';
import test from 'tape-rollup';

test('closest', assert => {
  const el = domassist.findOne('#domassist');
  const levels = 4;
    // clean up test dom
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  function addNode(num) {
    const node = document.createElement('div');
    node.innerText = num;
    node.classList.add(`level-${num}`);
    const children = el.children;
    if (children.length) {
      const child = domassist.findOne(`.level-${num - 1}`);
      child.appendChild(node);
    } else {
      el.appendChild(node);
    }
  }
  for (let i = 0; i < levels; i += 1) {
    addNode(i + 1);
  }
  const startEl = domassist.findOne(`.level-${levels}`);
  let count = levels - 1;
  while (count) {
    assert.ok(domassist.closest(startEl, `.level-${count}`), `Should find element with class of level-${count}`);
    --count;
  }
  assert.notOk(domassist.closest(startEl, '.level-a'), "Shouldnt't find element with class of level-a");

  assert.end();
});

test('closest of an SVG element', assert => {
  const node = document.createElement('div');
  node.className = 'svg-wrapper';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  node.appendChild(svg);

  const closest = domassist.closest(svg, '.svg-wrapper');

  assert.equal(closest, node, 'Found closest');

  assert.end();
});
