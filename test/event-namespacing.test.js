import domassist from '../domassist';
import test from 'tape-rollup';
import TestUtils from './test-utils';

test('Events - Namespaced should fire', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;
  const link = domassist.findOne('a');

  domassist.on(link, 'click.domassist', e => {
    assert.pass('Event has been fired');
  });

  link.click();
  assert.end();
});

test('Events - Should be possible to unbind single event and namespace', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a');

  domassist.on(link, 'click.domassist', () => {
    assert.fail('I should not fire');
  });

  domassist.on(link, 'mouseenter.domassist', () => {
    assert.pass('Mouse enter fired normally');
  });

  domassist.off(link, 'click.domassist');

  link.click();
  TestUtils.fireEvent(link, 'mouseenter');
  assert.end();
});

test('Events - Should be possible to unbind whole namespace', assert => {
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a');

  domassist.on(link, 'click.domassist', () => {
    assert.fail('I should not fire');
  });

  domassist.on(link, 'mouseenter.domassist', () => {
    assert.fail('I should not fire');
  });

  domassist.on(link, 'custom.domassist', () => {
    assert.fail('I should not fire');
  });

  domassist.off(link, '.domassist');

  link.click();
  TestUtils.fireEvent(link, 'mouseenter');
  TestUtils.fireEvent(link, 'custom');
  assert.pass('No event have fired');
  assert.end();
});
