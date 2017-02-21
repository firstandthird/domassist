import domassist from '../domassist';
import test from 'tape-rollup';

const classes = ['class-1', 'class-2', 'class-3'];
const setup = (el) => {
  el.innerHTML = `<div id="div-0" class="test-divs"><p>paragraph-0</p></div>
    <div id="div-1" class="test-divs"><p>paragraph-1</p></div>
    <div id="div-2" class="test-divs"><p>paragraph-2</p></div>
    <div id="div-3" class="test-divs"><p>paragraph-3</p></div>
    <div id="div-4" class="test-divs"><p>paragraph-4</p></div>`;
};

const teardown = (el) => {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

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

  teardown(el);
  assert.end();
});

test('addClass - single element / multiple classes', assert => {
  const el = domassist.findOne('#domassist');
  domassist.addClass(el, classes);
  assert.equal(el.classList.length, 3, 'Three classes added to single element');
  assert.end();
});

test('addClass - multiple elements / multiple classes', assert => {
  const el = domassist.findOne('#domassist');
  const total = 5;
  setup(el);
  domassist.addClass('.test-divs', classes);
  const divs = domassist.find('.test-divs');
  const count = divs.filter((div) => {
    const totalClasses = classes.filter((cls) => div.classList.contains(cls));
    return totalClasses.length === 3;
  });
  assert.equal(count.length, total, 'All elements got classes added');
  teardown(el);
  assert.end();
});

test('removeClass - single element / multiple classes', assert => {
  const el = domassist.findOne('#domassist');
  domassist.addClass(el, classes);
  domassist.removeClass(el, classes);
  assert.equal(el.classList.length, 0, 'Three classes removed from single element');
  assert.end();
});

test('removeClass - multiple elements / multiple classes', assert => {
  const el = domassist.findOne('#domassist');
  setup(el);
  domassist.addClass('.test-divs', classes);
  domassist.removeClass('.test-divs', classes);
  const divs = domassist.find('.test-divs');
  const count = divs.filter((div) => {
    const totalClasses = classes.filter((cls) => div.classList.contains(cls));
    return totalClasses.length === 3;
  });
  assert.equal(count.length, 0, 'All classes removed from elements');
  teardown(el);
  assert.end();
});

test('hasClass - selector', assert => {
  const el = domassist.findOne('#domassist');
  setup(el);
  assert.equal(domassist.hasClass('.test-divs', 'test-divs'), true, 'selector with existing element');
  assert.equal(domassist.hasClass('.nope', 'test-divs'), false, 'selector with non-existing element');
  const testDiv = document.querySelector('.test-divs');
  assert.equal(domassist.hasClass(testDiv, 'test-divs'), true, 'dom node');
  const nonEl = document.querySelector('.nope');
  assert.equal(domassist.hasClass(nonEl, 'test-divs'), false, 'false if element doesnt exist');
  teardown(el);
  assert.end();
});
