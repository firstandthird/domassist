import domassist from '../domassist';
import test from 'tape-rollup';

test('Events - off single element several events', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);

  let clicked = false;

  domassist.on(link, 'click', e => {
    clicked = true;
  });

  domassist.on(link, 'click', e => {
    clicked = true;
  });

  domassist.on(link, 'click', e => {
    clicked = true;
  });

  domassist.off(link, 'click');

  link.click();

  setTimeout(() => {
    assert.ok(!clicked, 'Event not fired');
  }, 500);
});

test('Events - Several handlers, one unbound', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);
  const myRemovableHandler = () => {
    assert.fail('This should never fire');
  };

  domassist.on(link, 'click', () => {
    assert.pass('Should only fire this event');
  });

  domassist.on(link, 'click', myRemovableHandler);
  domassist.off(link, 'click', myRemovableHandler);

  link.click();
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

  domassist.on(links, 'click', () => {
    assert.fail('I should never fire');
  });

  domassist.off(links, 'click');

  links.forEach(item => {
    item.click();
  });

  assert.end();
});
