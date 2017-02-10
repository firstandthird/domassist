import domassist from '../domassist';
import test from 'tape-rollup';

function addNode(el, num) {
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

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

test('closest - element', assert => {
  const el = domassist.findOne('#domassist');
  const levels = 4;
  for (let i = 0; i < levels; i += 1) {
    addNode(el, i + 1);
  }
  const startEl = domassist.findOne(`.level-${levels}`);
  let count = levels - 1;
  while (count) {
    assert.ok(domassist.closest(startEl, `.level-${count}`), `Should find element with class of level-${count}`);
    --count;
  }
  teardown(el);
  assert.end();
});

test('closest - selector', assert => {
  const el = domassist.findOne('#domassist');
  const levels = 4;
  for (let i = 0; i < levels; i += 1) {
    addNode(el, i + 1);
  }
  let count = levels - 1;
  while (count) {
    assert.ok(domassist.closest(`.level-${levels}`, `.level-${count}`), `Should find element with class of level-${count}`);
    --count;
  }
  teardown(el);
  assert.end();
});
