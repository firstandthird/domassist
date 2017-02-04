# domassist

[![Build Status](https://travis-ci.org/firstandthird/domassist.svg?branch=master)](https://travis-ci.org/firstandthird/domassist)

This is a collection of functions designed to make working the DOM easier.

## Installation

`npm install --save domassist`

## Usage

In your project import the library:

`import domassist from 'domassist'`

The first argument for each method you are interested is either a selector, DOM node, or a collection of 
DOM Nodes

```javascript
const els = domassist.find('.my-class');
domassist.addClass(els, 'my-new-class');
```

## API

- [find](#findselector-context)
- [findOne](#findoneselector-context)
- [addClass](#addclassselector-classes)
- [removeClass](#removeclassselector-classes)
- [toggleClass](#toggleclassselector-classes)
- [hasClass](#hasclassselector-class)
- [html](#htmlselector-value)

### find(selector, [context])

Find elements on the page based on a valid CSS selector.

#### Parameters:

`selector` - {string|Element|NodeList} - A valid CSS selector. If a NodeList is passed it will be converted to an Array.

`[context]` - Where to start looking for the selector.

#### Returns:

`Array` - If no element is found an empty array is returned.

#### Example:

```javascript
domassist.find('p'); // find all paragraph tags
domassist.find('[type="text"]', document.forms[0]); // find all text fields in the first form
```

### findOne(selector, [context])

Find a single element on a page. If more than one element is found for a selector, the first instance is returned.

If no element is found `null` is returned

#### Parameters:

`selector` - {string} A valid CSS selector

`[context]` - Where to start looking for the selector.

#### Returns:

`Element|null` - If no element is found `null` is returned.

### addClass(selector, classes)

Add one or more classes to an element(s). For multiple classes pass an array.

#### Parameters:

`selector` - {string|Element|NodeList} - A valid CSS selector. If a NodeList is passed it will be converted to an Array.
`classes` - {string|Array} The class or classes to add.

#### Returns:

`Array` - An array of elements that classes were applied to.

#### Example:

```javascript
domassist.addClass('.my-div', 'new-class');
domassist.addClass('.my-div', ['class-1', 'class-2', 'class-3']);
```

### removeClass(selector, classes)

Remove one or more classes to an element(s). For multiple classes pass an array.

#### Parameters:

`selector` - {string|Element|NodeList} - A valid CSS selector. If a NodeList is passed it will be converted to an Array.
`classes` - {string|Array} The class or classes to add.

#### Returns:

`Array` - An array of elements that classes were applied to.

#### Example:

```javascript
domassist.removeClass('.my-div', 'new-class');
domassist.removeClass('.my-div', ['class-1', 'class-2', 'class-3']);
```


### toggleClass(selector, class)

Add a class if it doesn't exist and vice versa if it does.

#### Parameters:

`selector` - {string|Element} - A valid CSS selector. If a NodeList is passed it will be converted to an Array.
`class` - {string} The class to toggle.

#### Example:

```javascript
// new-class does not exist on element
domassist.toggleClass('.my-div', 'new-class'); // class added
domassist.toggleClass('.my-div', 'new-class'); // class removed
```


### hasClass(selector, class)

Find out if an element has a class assigned or not.

#### Parameters:

`selector` - {string|Element} - A valid CSS selector.
`class` = {string} - The class to check for.

#### Returns:

`Boolean` - True is returned if the class exist.


### html(selector, value)

Update inner HTML of an element.

#### Parameters:

`selector` - {string|Element|NodeList} - A valid CSS selector, HTML element, or.
`classes` - {string|Array} The class or classes to add.

#### Example:

```javascript
domassist.html('.my-div', 'hello world'); // add html
domassist.html('.my-div', ''); // remove html
```




## License

### MIT License

Copyright (c) 2016 First+Third

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
