import mapEls from '../lib/mapEls.js';
import test from 'tape-rollup';

test('call function for each key', assert => {
  const container = document.getElementById('domassist');

  container.innerHTML = `
    <div id="div1"></div>
    <div id="div2"></div>
    <p></p>
    <p></p>
  `;

  const div2 = document.getElementById('div2');
  const p2 = document.querySelectorAll('p');
  const small = document.querySelectorAll('small');
  let count = 0;
  mapEls([
    ['#div1', 'div1'],
    [div2, 'div2'],
    ['p', 'p1'],
    [p2, 'p2'],
    [small, 'small'],
    ['#div2', 'multiple', 'values']
  ], (el, value, value2) => {
    assert.equal(el instanceof Node, true, 'el is a dom node');
    if (count === 0) {
      assert.equal(el.id, 'div1');
      assert.equal(value, 'div1');
    } else if (count === 1) {
      assert.equal(el.id, 'div2');
      assert.equal(value, 'div2');
    } else if (count === 2) {
      assert.equal(el.tagName, 'P');
      assert.equal(value, 'p1');
    } else if (count === 3) {
      assert.equal(el.tagName, 'P');
      assert.equal(value, 'p1');
    } else if (count === 4) {
      assert.equal(el.tagName, 'P');
      assert.equal(value, 'p2');
    } else if (count === 5) {
      assert.equal(el.tagName, 'P');
      assert.equal(value, 'p2');
    } else if (count === 6) {
      assert.equal(el.id, 'div2');
      assert.equal(value, 'multiple');
      assert.equal(value2, 'values');
    }
    count++;
  });
  assert.equal(count, 7);
  assert.end();
});
