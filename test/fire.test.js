import domassist from '../domassist';
import test from 'tape-rollup';

test('Custom event', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;
  const link = domassist.findOne('a');

  domassist.on(link, 'foo', e => {
    assert.ok(true, 'Event fired');
    assert.end();
  });

  domassist.fire(link, 'foo');
});

test('Custom event with data', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;
  const link = domassist.findOne('a');

  domassist.on(link, 'foo', e => {
    assert.equal(e.detail.a, 'b', 'Event has data');
    assert.end();
  });

  domassist.fire(link, 'foo', {
    detail: {
      a: 'b'
    }
  });
});

test('Custom Events - on multiple elements', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(4);
  el.innerHTML = `
    <a id="link-1" href="#">Click</a>
    <a id="link-2" href="#">Click</a>
    <a id="link-3" href="#">Click</a>
    <a id="link-4" href="#">Click</a>
  `;
  const links = domassist.find('a', el);
  let index = 1;
  domassist.on(links, 'foo', e => {
    assert.equal(e.target.id, `link-${index}`, `Link with id of link-${index} fired`);
    index++;
  });

  domassist.fire(links, 'foo');
});

test('Custom Events - Bubbles by default', assert => {
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <a id="link-1" href="#">Click</a>
    <a id="link-2" href="#">Click</a>
    <a id="link-3" href="#">Click</a>
    <a id="link-4" href="#">Click</a>
  `;
  domassist.on(el, 'foo', () => {
    assert.pass('Event caught on parent');
    assert.end();
  });

  domassist.fire('#link-1', 'foo');
});

test('Custom Events - Bubble can be overridden', assert => {
  const el = domassist.findOne('#domassist');
  el.innerHTML = `
    <a id="link-1" href="#">Click</a>
    <a id="link-2" href="#">Click</a>
    <a id="link-3" href="#">Click</a>
    <a id="link-4" href="#">Click</a>
  `;
  domassist.on(el, 'foo', () => {
    assert.fail('Event caught on parent');
    assert.end();
  });

  domassist.fire('#link-1', 'foo', { bubbles: false });
  assert.pass('Event not caught on parent');
  assert.end();
});
