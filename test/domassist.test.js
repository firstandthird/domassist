/* eslint no-console: 0 */

import domassist from '..';

import { test } from 'tape';

const init = () => {
  const container = document.createElement('div');
  container.id = 'domassist';
  document.body.appendChild(container);
};

init();

const page = window.phantom.page;

test('find, findOne', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <ul>
      <li>Test1</li>
      <li>Test2</li>
    </ul>
    <p>p1</p>
    <p>p2</p>
  `;

  // Test default find
  const found1 = domassist.find('p');
  assert.ok(found1 instanceof NodeList, 'Default - Elements found');
  assert.equal(found1.length, 2, 'Default - Correct number of elements');

  // Test scoped find
  const list = domassist.findOne('ul');
  const found2 = domassist.find('li', list);
  assert.ok(found2 instanceof NodeList, 'Scoped - Elements found');
  assert.equal(found2.length, 2, 'Scoped - Correct number of elements');
  assert.end();
});

test('addClass, hasClass, removeClass', assert => {
  const el = domassist.findOne('#domassist');

  assert.ok(!domassist.hasClass(el, 'testClass'), 'Does not have test class');
  domassist.addClass(el, 'testClass');
  assert.ok(domassist.hasClass(el, 'testClass'), 'Class added');
  domassist.removeClass(el, 'testClass');
  assert.ok(!domassist.hasClass(el, 'testClass'), 'test class removed');
  assert.end();
});

test('show, hide', assert => {
  const el = domassist.findOne('#domassist');
  el.style.display = 'inline';

  domassist.hide(el);
  assert.equal(el.style.display, 'none', 'Element hidden');
  domassist.show(el);
  assert.equal(el.style.display, 'inline', 'Element shown');

  // reset
  el.style.display = 'block';
  assert.end();
});

test('matches', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <div class="test"></div>
  `;

  const matcher = domassist.findOne('div', el);
  assert.ok(domassist.matches(matcher, '.test'), 'Matches');
  assert.end();
});

test('closest', assert => {
  const el = domassist.findOne('#domassist');
  const levels = 4;
  // clean up test dom
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  function addNode(num) {
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
  for (let i = 0; i < levels; i += 1) {
    addNode(i + 1);
  }
  const startEl = domassist.findOne(`.level-${levels}`);
  let count = levels - 1;
  while (count) {
    assert.ok(domassist.closest(startEl, `.level-${count}`), `Should find element with class of level-${count}`);
    --count;
  }
  assert.end();
});

test('Events - on', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);
  const pos = link.getBoundingClientRect();

  domassist.on(link, 'click', e => {
    assert.ok(e instanceof MouseEvent, 'Event fired');
    assert.end();
  });

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
});

test('Events - off', assert => {
  const el = domassist.findOne('#domassist');

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
    assert.end();
  }, 500);
});

test('Events - delegate', assert => {
  const el = domassist.findOne('#domassist');

  domassist.delegate(el, 'click', 'button', e => {
    assert.ok(e instanceof MouseEvent, 'Event fired');
    assert.end();
  });

  el.innerHTML = `
    <button type="button">Click</button>
  `;

  const button = domassist.findOne('button', el);
  const pos = button.getBoundingClientRect();

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
});

test('Events - once', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <a href="#">Click</a>
  `;

  const link = domassist.findOne('a', el);
  const pos = link.getBoundingClientRect();

  let clicks = 0;

  domassist.once(link, 'click', e => {
    clicks++;
  });

  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('click', pos.left + pos.width / 2, pos.top + pos.height / 2);

  setTimeout(() => {
    assert.equal(clicks, 1, 'Only fired once');
    assert.end();
  }, 500);
});

test('Events - hover', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <div style="height: 100px; width: 100px;"></div>
  `;

  const box = domassist.findOne('div', el);
  const pos = box.getBoundingClientRect();

  domassist.hover(box, e => {
    assert.ok(e instanceof MouseEvent, 'Enter fired');
    assert.equal(e.type, 'mouseenter', 'Correct event');
  }, e => {
    assert.ok(e instanceof MouseEvent, 'Leave fired');
    assert.equal(e.type, 'mouseleave', 'Correct event');
    assert.end();
  });

  page.sendEvent('mousemove', pos.left + pos.width / 2, pos.top + pos.height / 2);
  page.sendEvent('mousemove', pos.left + pos.width + 100, pos.top + pos.height + 100);
});
