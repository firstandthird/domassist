import domassist from '../domassist';
import test from 'tape-rollup';

const page = window.phantom.page;

test('Events - off single element', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(1);
  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);
  const pos = link.getBoundingClientRect();

  let clicked = false;

  domassist.on(link, 'click', e => {
    clicked = true;
  });

  domassist.off(link, 'click');

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);

  setTimeout(() => {
    assert.ok(!clicked, 'Event not fired');
  }, 500);
});

test('Events - off multiple elements', assert => {
  const el = domassist.findOne('#domassist');
  assert.plan(4);
  el.innerHTML = `
    <a data-id="link-1" href="#">Click</a>
    <a data-id="link-2" href="#">Click</a>
    <a data-id="link-3" href="#">Click</a>
    <a data-id="link-4" href="#">Click</a>
  `;

  const links = domassist.find('a', el);
  domassist.on(links, 'click', e => {
    const id = parseInt(e.target.dataset.id.replace('link-', ''), 10);
    const div = document.createElement('div');
    div.id = `id-${id}`;
    el.appendChild(div);
  });
  // domassist.off(links, 'click');
  links.forEach((item, index) => {
    const pos = item.getBoundingClientRect();
    const id = `id-${index + 1}`;
    page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
    const div = domassist.findOne(`#${id}`);
    setTimeout(() => {
      assert.equal(div.id, id, `Element with ID link-${index + 1} has no click event`);
    }, 500);
  });
});
