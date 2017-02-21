import domassist from '../domassist';
import test from 'tape-rollup';

function addNodes() {
  return `
    <div class="level-1">1
      <div class="level-2">2
        <div class="level-3">3
          <div class="level-4">4</div>
        </div>
      </div>
    </div>`;
}

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

test('closest - element', assert => {
  const el = domassist.findOne('#domassist');
  const levels = 4;
  domassist.html(el, addNodes());
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
  domassist.html(el, addNodes());
  let count = levels - 1;
  while (count) {
    assert.ok(domassist.closest(`.level-${levels}`, `.level-${count}`), `Should find element with class of level-${count}`);
    --count;
  }
  teardown(el);
  assert.end();
});
