import domassist from '../domassist';
import test from 'tape-rollup';

test('show, hide - Selector', assert => {
  const el = domassist.findOne('#domassist');
  el.style.display = 'inline';

  domassist.hide('#domassist');
  domassist.hide('#domassist');
  assert.equal(el.style.display, 'none', 'Element hidden');
  domassist.show('#domassist');
  assert.equal(el.style.display, 'inline', 'Element shown');

  // reset
  el.style.display = 'block';
  assert.end();
});

test('show, hide - Node', assert => {
  const el = domassist.findOne('#domassist');
  el.style.display = 'inline';

  domassist.hide(el);
  domassist.hide(el);
  assert.equal(el.style.display, 'none', 'Element hidden');
  domassist.show(el);
  assert.equal(el.style.display, 'inline', 'Element shown');

  // reset
  el.style.display = 'block';
  assert.end();
});
