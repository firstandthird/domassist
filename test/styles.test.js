import domassist from '../domassist';
import test from 'tape-rollup';

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

test('styles - Selector', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <p>p1</p>
    <p>p2</p>
  `;

  const els = domassist.find('p');
  domassist.styles('p', {
    width: '100px',
    height: '150px'
  });
  assert.equal(els[0].style.width, '100px', 'width on first el set correctly');
  assert.equal(els[0].style.height, '150px', 'height on first el set correctly');
  assert.equal(els[1].style.width, '100px', 'width on second el set correctly');
  assert.equal(els[1].style.height, '150px', 'height on second el set correctly');
  teardown(el);
  assert.end();
});

test('styles - Array', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <p>p1</p>
    <p>p2</p>
  `;

  const els = domassist.find('p');
  domassist.styles(els, {
    width: '100px',
    height: '150px'
  });

  assert.equal(els[0].style.width, '100px', 'width on first el set correctly');
  assert.equal(els[0].style.height, '150px', 'height on first el set correctly');
  assert.equal(els[1].style.width, '100px', 'width on second el set correctly');
  assert.equal(els[1].style.height, '150px', 'height on second el set correctly');
  teardown(el);
  assert.end();
});
