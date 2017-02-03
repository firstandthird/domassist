# domassist

[![Build Status](https://travis-ci.org/firstandthird/domassist.svg?branch=master)](https://travis-ci.org/firstandthird/domassist)

This is a collection of functions designed to make working the DOM easier.

## Installation

`npm install --save-dev domassist`

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

### find(selector, [context])

Find elements on the page based on a valid CSS selector. `context` is where to start looking for the selector.
`domassist.find('p', '.my-class')` will look for paragraphs inside any element with a class of `my-class`.

Returns 

### findOne()

## License
