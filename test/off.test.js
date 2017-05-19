import domassist from '../domassist';
import test from 'tape-rollup';

test('Events - off single element single event', assert => {
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);
  const handler = () => {
    assert.fail('I should not fire');
  };

  domassist.on(link, 'click', handler);
  domassist.off(link, 'click', handler);

  link.click();

  assert.ok('No events fired');
  assert.end();
});

test('Events - off multiple elements', assert => {
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <a data-id="link-1" href="#">Click</a>
    <a data-id="link-2" href="#">Click</a>
    <a data-id="link-3" href="#">Click</a>
    <a data-id="link-4" href="#">Click</a>
  `;

  const links = domassist.find('a', el);
  const handler = () => {
    assert.fail('I should never fire');
  };

  domassist.on(links, 'click', handler);
  domassist.off(links, 'click', handler);

  links.forEach(item => {
    item.click();
  });

  assert.ok('No events fired');
  assert.end();
});

test('Events - off with id', assert => {
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);
  const handler = () => {
    assert.fail('I should not fire');
  };

  const id = domassist.on(link, 'click', handler);
  domassist.off(id);

  link.click();

  assert.ok('No events fired');
  assert.end();
});

test('Events - off with array of ids', assert => {
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <a data-id="link-1" href="#">Click</a>
    <a data-id="link-2" href="#">Click</a>
    <a data-id="link-3" href="#">Click</a>
    <a data-id="link-4" href="#">Click</a>
  `;

  const links = domassist.find('a', el);
  const handler = () => {
    assert.fail('I should never fire');
  };

  const ids = domassist.on(links, 'click', handler);

  assert.ok(Array.isArray(ids), 'Ids should be an array');
  assert.equal(ids.length, 4, 'Should have 4 ids');

  domassist.off(ids);
  links.forEach(item => {
    item.click();
  });

  assert.ok('No events fired');
  assert.end();
});
