/* eslint no-console: 0 */

import domassist from '../domassist';

import test from 'tape-rollup';

const init = () => {
  const container = document.createElement('div');
  container.id = 'domassist';
  document.body.appendChild(container);
};

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

init();

const page = window.phantom.page;

test('ready', assert => {
  // if you add more assertions update this number
  const assertions = 3;

  assert.plan(assertions);

  domassist.ready(() => {
    const x = 1;
    assert.ok(x === 1, '1st ready() fired');
  });
  domassist.ready(() => {
    const x = 2;
    assert.ok(x === 2, '2nd ready() fired');
  });
  domassist.ready(() => {
    const x = 3;
    assert.ok(x === 3, '3rd ready() fired');
  });
});

test('find', assert => {
  const el = document.getElementById('domassist');
  const frag = document.createDocumentFragment();
  const total = 5;
  for (let i = 0; i < total; i += 1) {
    const div = document.createElement('div');
    domassist.addClass(div, 'test-divs');
    domassist.addClass(div, `div-${i}`);
    const p = document.createElement('p');
    p.innerHTML = `paragraph-${1}`;
    div.appendChild(p);
    frag.appendChild(div);
  }
  el.appendChild(frag);
  const els = domassist.find('.test-divs');

  // test passing a string selector
  assert.ok(Array.isArray(els), 'Returned value should be an array');
  assert.equal(els.length, total, `Number of returned items should be ${total}`);

  // test passing a DOM node
  assert.ok(Array.isArray(domassist.find(el)), 'Passed DOM node is returned as an array');
  assert.equal(domassist.find(el).length, 1, 'Number of returned items should be 1');
  // test passing a selector that isn't found;
  assert.equal(domassist.find('hello').length, 0, 'Pass non-existent selector returns empty array');

  // find element with context
  const para = domassist.find('p', '.div-1');
  assert.ok(Array.isArray(para), 'Pass selector with context should return an array');
  assert.equal(para.length, 1, 'Number of return items should be 1');
  assert.equal(para[0].innerHTML, 'paragraph-1', 'Element\'s copy should be "paragraph-1"');

  // test by passing a NodeList
  const divs = domassist.find(document.querySelectorAll('.test-divs'));
  assert.ok(Array.isArray(divs), 'NodeList returned as an array');
  assert.equal(divs.length, 5, 'NodeList returned with 5 items');
  teardown(el);
  assert.end();
});

test('findOne', assert => {
  const el = domassist.find('#domassist');

  el[0].innerHTML = `
    <ul id="list">
      <li id="firstItem">Test1</li>
      <li>Test2</li>
    </ul>
    <p class="para1">p1</p>
    <p class="para2"><span>p2</span></p>
  `;

  assert.ok(domassist.findOne('#list'), 'Element found');
  assert.notOk(domassist.findOne('#fake'), 'Element not found');
  const firstItem = domassist.findOne('#firstItem');
  assert.equal(firstItem.innerHTML, 'Test1', 'ID selector found with value of Test1');
  const para = domassist.findOne('.para1');
  assert.equal(para.innerHTML, 'p1', 'Class selector found with value of p1');
  const elWithContext = domassist.findOne('span', '.para2');
  assert.equal(elWithContext.innerHTML, 'p2', 'Correct element with context found');
  teardown(el);
  assert.end();
});

test('addClass, hasClass, removeClass, toggleClass', assert => {
  const el = domassist.findOne('#domassist');

  assert.ok(!domassist.hasClass(el, 'testClass'), 'Does not have test class');
  domassist.addClass(el, 'testClass');
  assert.ok(domassist.hasClass(el, 'testClass'), 'Class added');
  domassist.removeClass(el, 'testClass');
  assert.ok(!domassist.hasClass(el, 'testClass'), 'test class removed');

  el.innerHTML = '<div></div>';
  domassist.toggleClass(el.firstChild, 'new-class');
  assert.ok(domassist.hasClass(el.firstChild, 'new-class'), 'toggleClass - class list should contain "new-class"');
  domassist.toggleClass(el.firstChild, 'new-class');
  assert.notOk(domassist.hasClass(el.firstChild, 'new-class'), 'toggleClass - class list should not contain "new-class"');
  // teardown
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  assert.end();
});

test('toArray - null', assert => {
  const els = domassist.toArray();
  assert.equal(Array.isArray(els), true, 'always returns an array');
  assert.equal(els.length, 0, 'returns empty array if null');
  assert.end();
});

test('toArray - single node', assert => {
  const container = domassist.findOne('#domassist');

  container.innerHTML = `
    <div class="test"></div>
  `;
  const el = domassist.findOne('div', container);
  const els = domassist.toArray(el);
  assert.equal(Array.isArray(els), true, 'is array');
  assert.equal(els.length, 1);
  assert.equal(els[0], el);
  assert.end();
});

test('toArray - nodelist', assert => {
  const frag = document.createDocumentFragment();
  const total = 5;
  for (let i = 0; i < total; i += 1) {
    const div = document.createElement('div');
    domassist.addClass(div, 'div-array');
    frag.appendChild(div);
  }
  const el = domassist.findOne('#domassist');
  el.appendChild(frag);
  const divs = domassist.find('.div-array');
  const arr = domassist.toArray(divs);
  assert.ok(Array.isArray(arr), 'Nodelist converted to an array');
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
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

test('styles', assert => {
  const el = domassist.findOne('#domassist');

  el.innerHTML = `
    <p>p1</p>
    <p>p2</p>
  `;

  // Test default find
  const els = domassist.find('p');
  domassist.styles(els, {
    width: '100px',
    height: '150px'
  });

  assert.equal(els[0].style.width, '100px', 'width on first el set correctly');
  assert.equal(els[0].style.height, '150px', 'height on first el set correctly');
  assert.equal(els[1].style.width, '100px', 'width on second el set correctly');
  assert.equal(els[1].style.height, '150px', 'height on second el set correctly');

  assert.end();
});
