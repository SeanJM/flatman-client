# Create Node 1.2.8
#### License: [MIT](https://opensource.org/licenses/MIT)

#### 🚫 0 of 55 tests passed (0%)

## Table of Contents

#### Overview

- [Description](#description-md-top-top)
- [Installation](#installation-md-top-top)
- [Notes](#notes-md-top-top)

- Component
  - [Required Methods](#component--required-methods-top)
  - [Initialing A Component](#component--initialing-a-component-top)
  - [The Options Object](#component--the-options-object-top)
  - [Writing A Component](#component--writing-a-component-top)

- Examples
  - [Nesting](#examples--nesting-top)
  - [Basic Usage](#examples--basic-usage-top)
  - [Wrapping The Dom](#examples--wrapping-the-dom-top)
  - [What You Can Pass As An Object](#examples--what-you-can-pass-as-an-object-top)

- Functional Methods
  - [Basics](#functional-methods--basics-top)
  - [el.addClass](#functional-methods--el-addclass-top)
  - [el.isComponent](#functional-methods--el-iscomponent-top)

- El Methods

  - Attributes
    - [addClass](#el-methods--attributes--addclass-top)
    - [attr](#el-methods--attributes--attr-top)
    - [className](#el-methods--attributes--classname-top)
    - [copy](#el-methods--attributes--copy-top)
    - [name](#el-methods--attributes--name-top)
    - [removeClass](#el-methods--attributes--removeclass-top)
    - [toggleClass](#el-methods--attributes--toggleclass-top)

  - Dom Manipulation
    - [append](#el-methods--dom-manipulation--append-top)
    - [appendTo](#el-methods--dom-manipulation--appendto-top)
    - [before](#el-methods--dom-manipulation--before-top)
    - [check](#el-methods--dom-manipulation--check-top)
    - [clone](#el-methods--dom-manipulation--clone-top)
    - [disable](#el-methods--dom-manipulation--disable-top)
    - [enable](#el-methods--dom-manipulation--enable-top)
    - [focus](#el-methods--dom-manipulation--focus-top)
    - [html](#el-methods--dom-manipulation--html-top)
    - [prepend](#el-methods--dom-manipulation--prepend-top)
    - [prependTo](#el-methods--dom-manipulation--prependto-top)
    - [remove](#el-methods--dom-manipulation--remove-top)
    - [replaceWith](#el-methods--dom-manipulation--replacewith-top)
    - [select](#el-methods--dom-manipulation--select-top)
    - [style](#el-methods--dom-manipulation--style-top)
    - [text](#el-methods--dom-manipulation--text-top)
    - [uncheck](#el-methods--dom-manipulation--uncheck-top)
    - [value](#el-methods--dom-manipulation--value-top)

  - Events
    - [doubleclick](#el-methods--events--doubleclick-top)
    - [off](#el-methods--events--off-top)
    - [on](#el-methods--events--on-top)
    - [once](#el-methods--events--once-top)
    - [trigger](#el-methods--events--trigger-top)
    - [Input](#el-methods--events--input-top)
    - [Drag And Drop](#el-methods--events--drag-and-drop-top)

  - Predicates
    - [contains](#el-methods--predicates--contains-top)
    - [hasClass](#el-methods--predicates--hasclass-top)
    - [hasParent](#el-methods--predicates--hasparent-top)
    - [isChecked](#el-methods--predicates--ischecked-top)
    - [isFocused](#el-methods--predicates--isfocused-top)
    - [isVisible](#el-methods--predicates--isvisible-top)

  - Query
    - [children](#el-methods--query--children-top)
    - [closest](#el-methods--query--closest-top)
    - [find](#el-methods--query--find-top)
    - [getSelector](#el-methods--query--getselector-top)
    - [hasClass](#el-methods--query--hasclass-top)
    - [offset](#el-methods--query--offset-top)
    - [parent](#el-methods--query--parent-top)
    - [parents](#el-methods--query--parents-top)
    - [parentsUntil](#el-methods--query--parentsuntil-top)
    - [scrollWidth](#el-methods--query--scrollwidth-top)
    - [selectorPath](#el-methods--query--selectorpath-top)
    - [siblings](#el-methods--query--siblings-top)
    - [textNodes](#el-methods--query--textnodes-top)
- [Tests](#tests)

## Description ([top](#table-of-contents))

- Create nodes with a simple interface which will be very familiar.
- Get an API to simplify DOM manipulation
- Plugin architecture to extend the prototype

Thanks to [FRZR](https://frzr.js.org/) for some help for clearing up the "child" problem https://freezer.js.org/minimum-viable-view-library/

### `el.isComponent` [top](#methods)

## Installation ([top](#table-of-contents))

Include the script in your `body` tag, or `head`, I think it's wise to place it in the `body`, at the bottom.

```HTML
<script src="createNode.min.js"></script>
```

## Notes ([top](#table-of-contents))

I use this on production, and I would like some help on it. Thanks. The goal is to keep it as simple and light as possible. It's a bit of a bastard child between FRZR and jQuery — a somewhat attractive & useful bastard.

## Component
### Component / Required Methods ([top](#table-of-contents))

- `addClass` when the class key is present
- `on` when a key matching that pattern is present
- `off` when a key matching that pattern is present
- `trigger` when a key matching that pattern is present

You will also get the options object passed to the constructor.

### Component / Initialing A Component ([top](#table-of-contents))

The most basic way to initialize a component is like this:

```javascript
el(Component)
```

It takes the same type of arguments that a regular `el` takes.

A component and an element are designed to be similar. This means you can do things like this:

```javascript
el(Component, [
  el('div'),
  el(Component)
]);
```

### Component / The Options Object ([top](#table-of-contents))

You can pass your component any options.

- Keys will be checked for matching methods
- The options will be passed as an argument to the Component constructor
- on* is used to attach event listeners on initialization
- `onmethod` or `onMethod` are treated equally

```
el(Component, {
  className : 'this-class', // Will actually trigger the components `addClass` method
  onclick : function () {}, // onclick and onClick are functionally identical
  onClick : function () {},
  componentMethod : argument // Will be passed as a single argument to your method
  init : [ 'method', 'method' ] // Functions to run last
})
```

### Component / Writing A Component ([top](#table-of-contents))

```javascript
function Component(options) {
  // Optional code
}

// The root node is always 'this.node.document'
// When you name a child node it's name will be automatically added to 'this.node'

Component.prototype.render = function () {
  return el('div', [
    el('div', { 
      name : 'label', 
      className : 'text' 
    }, [ this.dict.text ])
  ]);
};

Component.prototype.appendTo = function (target) {
  target.append(this.node.document);
};

Component.prototype.addClass = function (className) {
  this.node.document.addClass(className);
};

Component.prototype.on = function (name, callback) {
  this.node.document.on(name, callback);
};

Component.prototype.text = function (text) {
  this.node.label.text(text);
};

// A function to extend the prototypes of a constructor
Component.extend = function (Constructor) {
  for (var k in Component.prototype) {
    if (!Constructor.prototype[k]) {
      Constructor.prototype[k] = Component.prototype[k];
    }
  }
};
```

Putting it together

Any property which is not `className`, starts with `on` or `once` will be added as a property on `this.dict`.

```javascript
el(Component, {
  className : 'my-component-class',
  text : 'My Text',
  onClick : function () {
    // What it does when it's clicked on
  }
});
```

## Examples
### Examples / Nesting ([top](#table-of-contents))

```javascript
el('div', [
  el('div', { className : 'child'}),
  el('div', { className : 'child-2'})
]);
```

### Examples / Basic Usage ([top](#table-of-contents))

```javascript
el('div', { className : 'my-class-name' }, ['some text']);
```

### Examples / Wrapping The Dom ([top](#table-of-contents))

You can get all the methods and the simplified interface based on ideas in jQuery by wrapping a node in `el`.

```javascript
var wrapped = el(document.querySelector('#my-div'));
```

### Examples / What You Can Pass As An Object ([top](#table-of-contents))

- You can pass it anything which has an `appendTo` method

## Functional Methods
### Functional Methods / Basics ([top](#table-of-contents))

## Functional interfaces
- `el.contains`
- `el.fn`
- `el.hasParent`
- `el.isComponent`
- `el.isCreateNode`
- `el.isElement`
- `el.isVisible`

### Functional Methods / el.addClass ([top](#table-of-contents))

Is a curried function which can take `1` or `2` arguments.

Using `el.addClass` with a single argument will return a function which expects a `Node` or an `Array` of nodes.

Using the partially applied function:

```javascript
var pizzas = document.querySelectorAll('.pizza');
[].forEach.call(pizzas, el.addClass('class-name'));
```

Using the function with `2` arguments:

```javascript
var pizza = document.querySelector('.pizza');
el.addClass('class-name', pizza);
```

The order of the arguments does not matter

```javascript
var pizza = document.querySelector('.pizza');
el.addClass(pizza, 'class-name');
```

A curried function which adds class names to the `Node`
```javascript
var pizza = document.querySelector('.pizza');
var toppings = el.addClass(pizza);
toppings('peppers');
toppings('mushrooms');
```

### Functional Methods / el.isComponent ([top](#table-of-contents))

Returns `true` or `false` if the argument is a component

## El Methods
### Attributes
#### El Methods / Attributes / addClass ([top](#table-of-contents))

Will add a class to a node, and will check if the class does not exist before adding.

```javascript
el('div').addClass('this-class-name');
```

#### El Methods / Attributes / attr ([top](#table-of-contents))

```javascript
var div = el('div');
div.attr('data-attribute', 'value');
```
```html
<div data-attribute="value"></div>
```

***

```javascript
el('div').attr({
  className : 'some-class-name',
  style : 'background: red'
});
```
```html
<div class="some-class-name" style="background: red"></div>
```

#### El Methods / Attributes / className ([top](#table-of-contents))

Will set or return value of the attribute `class` for a `Node`.

```javascript
var b = el('div');

a.className('test');

a.className();
//-> test
```

#### El Methods / Attributes / copy ([top](#table-of-contents))

Will copy a target node's attributes from another node, including it's `innerHTML`.

```javascript
var a = el('div');
var b = el('div', { className : 'test' }, 'text');
a.copy(b);

a.className();
//-> test

a.html();
// -> text
```

#### El Methods / Attributes / name ([top](#table-of-contents))

Will set or return value of the attribute `name` for a `Node`.

```javascript
var b = el('div');

a.name('test');

a.name();
//-> test
```

#### El Methods / Attributes / removeClass ([top](#table-of-contents))

Will remove the class name from a node.

```html
<div id="copy" class="my-class-name" data-attribute="some-text">
```

```javascript
var node = el(document.querySelector('#copy'));
node.removeClass('my-class-name');
```

```html
<div id="copy" data-attribute="some-text">
```

#### El Methods / Attributes / toggleClass ([top](#table-of-contents))

Will toggle a class name on a node. If the class exists, it will be removed, if it does not exist, it will be added.

```javascript
var myDIV = el('div');
myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```

### Dom Manipulation
#### El Methods / Dom Manipulation / append ([top](#table-of-contents))

Is an interface for `appendChild`, the result being a way to add a `Node` to a parent `Node`.

When a `Node` is appended to an element in the `DOM` it emits a `mount` event.

```javascript
var parent = el('div', { className : 'parent-1' });
var child = el('div', { className : 'child-1' });
parent.append([child]);
```

is the same as

```javascript
var parent = el('div', { className : 'parent-1' }, [
  el('div', { className : 'child-1' })
]);
```

```javascript
el('div', { className : 'parent-1' }).append([
  el('div', { className : 'child-1' })
]);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
  <div class="child-2"></div>
</div>
```

#### El Methods / Dom Manipulation / appendTo ([top](#table-of-contents))

Is an interface for `appendChild`, the result being a way to add a child `Node` to a parent `Node`.

When a `Node` is appended to an element in the `DOM` it emmits a `mount` event.

```javascript
var parent = el('div', { className : 'parent-1' });
var child = el('div', { className : 'child-1' });
child.appendTo(parent);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
</div>
```

#### El Methods / Dom Manipulation / before ([top](#table-of-contents))

Is an interface for `insertBefore`, the result being a way to add a `Node` before the reference `Node`.

When a `Node` is appended to an element in the `DOM` it emmits a `mount` event.

```javascript
var parent = el('div', { className : 'parent-1' });
var reference = el('div', { className : 'reference-1' });
var before = el('div', { className : 'before-1' });

parent.append([ref]);
reference.before([before]);
```

```HTML
<div class="parent-1">
  <div class="before-1"></div>
  <div class="reference-1"></div>
</div>
```

#### El Methods / Dom Manipulation / check ([top](#table-of-contents))

Check a checkbox and radio

```javascript
var a = el('input', { type : 'checkbox' });

a.check();
a.isChecked();
// -> true
```

#### El Methods / Dom Manipulation / clone ([top](#table-of-contents))

Clones an element, is an interface for `Node.cloneNode(true)`

```javascript
var a = el('div', [
  el('div', { className : 'child-1' }),
  el('div', { className : 'child-2' }),
  el('div', { className : 'child-3' })
]);

var b = a.clone();
```

```html
<!-- b -->
<div>
  <div class="child-1"></div>
  <div class="child-2"></div>
  <div class="child-3"></div>
</div>
```

#### El Methods / Dom Manipulation / disable ([top](#table-of-contents))

Disables an element by setting it's `disabled` attribute to `disabled`

```javascript
var a = el('div').disable();
```

Result

```html
<div disabled="disabled"></div>
```

#### El Methods / Dom Manipulation / enable ([top](#table-of-contents))

Enables an element by removing it's `disabled` attribute

```html
<div id="disabled" disabled="disabled"></div>
```

```javascript
var a = el(document.getElementById('disabled')).enable();
```

```html
<div id="disabled"></div>
```

#### El Methods / Dom Manipulation / focus ([top](#table-of-contents))

Will `focus` an element. This will only work if the element is in the `document.body` and if it has an `tabindex` attribute.

```javascript
var a = el('div');
a.appendTo(document.body).focus();
```

### `html` [top](#methods)

Is an interface for `innerHTML`. When passed no arguments, it will return the value of `innerHTML`.

```javascript
var a = el('div');
a.html('test');
// a.node.innerHTML -> 'test'
// a.html() -> 'test'
```

#### El Methods / Dom Manipulation / html ([top](#table-of-contents))

Sets the `innerHTML` value of a node.

```javascript
var target = el(document.querySelector('.target-node'));
target.html('<div class="my-div"></div>');
```

Passing it no arguments will return the value of `innerHTML`

```javascript
var target = el(document.querySelector('.target-node'));
target.html();
// -> '<div class="my-div"></div>'
```

#### El Methods / Dom Manipulation / prepend ([top](#table-of-contents))

Will append a child element in the first position of the parent node.

```javascript
var parent = el('div', { className : 'parent' }, [
  el('div', { 'first-child' })
]);

var child = el('div', { className : 'second-child' });
```

```html
<div class="parent">
  <div class="first-child"></div>
</div>
```

```javascript
parent.prepend([child]);
```

```html
<div class="parent">
  <div class="second-child"></div>
  <div class="first-child"></div>
</div>
```

#### El Methods / Dom Manipulation / prependTo ([top](#table-of-contents))

Will append a child element in the first position of the parent node.

```javascript
var child = el('div', { className : 'second-child' });
var parent = el('div', { className : 'parent' }, [
  el('div', { 'first-child' })
]);
```

```html
<div class="parent">
  <div class="first-child"></div>
</div>
```

```javascript
child.prependTo(parent);
```

```html
<div class="parent">
  <div class="second-child"></div>
  <div class="first-child"></div>
</div>
```

#### El Methods / Dom Manipulation / remove ([top](#table-of-contents))

Will remove a `Node` from it's parent.

```javascript
var a = el('div', { className : 'parent' });
var b = el('div', { className : 'first-child' });

a.append(b);
```

```html
<div class="parent">
  <div class="first-child"></div>
</div>
```

```javascript
b.remove();
```

```html
<div class="parent">
</div>
```

#### El Methods / Dom Manipulation / replaceWith ([top](#table-of-contents))

Replaces a target node with a new node.

```javascript
var targetNode = el(document.querySelector('.target-node'));
var newNode = el('div', { className : 'new-node' });
targetNode.replaceWith(newNode);
```

#### El Methods / Dom Manipulation / select ([top](#table-of-contents))

Provides an interface to select text ranges and select the `option` node.

Query
```javascript
var a = el(document.querySelector('.my-input'));
a.select();
// -> [0, 2]
```

Set
```javascript
var a = el(document.querySelector('.my-input'));
a.select(0, 2);
```

By entering a single value, the cursor will be placed without selecting.
- Negative values start from the end.

```javascript
a.select(-1);
```

This example selects from the first letter to 3 letters from the end.

```javascript
a.select(0, -3);
```

`select`

```javascript
var a = el('select', [
  el('option'),
  el('option')
]);

a.select(0);

// -> will select the first option node
```

#### El Methods / Dom Manipulation / style ([top](#table-of-contents))

An interface to edit the style of a node, it can be used in 2 different ways.

- `el.style([ String property ], [ String|Number value])`
- `el.style([ Object property and values ])`

The property must be the JavaScript named property. Vendor prefixes are not necessary.

### Value and property

```javascript
var a = el('div');

a.style('fontSize', 13);
```

### Object

```javascript
var a = el('div');

a.style({
  fontSize : 13,
  fontWeight : 'bold'
});
```

### Get computed styles

```javascript
div.style();
// -> [ Object ]
```

```javascript
div.style('fontSize');
// -> 13px
```

#### El Methods / Dom Manipulation / text ([top](#table-of-contents))

Sets the text value of a node, uses `textContent` as opposed to `innerHTML`, this distinction is important since any HTML passed as a string will be converted to text.

```javascript
var target = el(document.querySelector('.target-node'));
target.text('my text');
```

Passing it no arguments will return the value of `textContent`

```javascript
var target = el(document.querySelector('.target-node'));
target.text();
// -> 'my text'
```

#### El Methods / Dom Manipulation / uncheck ([top](#table-of-contents))

Uncheck a checkbox and radio

```javascript
var a = el('input', { type : 'checkbox' });

a.check();
a.isChecked();
// -> true

a.uncheck();
a.isChecked();
// -> false
```

#### El Methods / Dom Manipulation / value ([top](#table-of-contents))

Query
```javascript
var a = el(document.querySelector('.my-input'));
a.value();
// -> 'My text'
```

Set
```javascript
var a = el(document.querySelector('.my-input'));
a.value('New text');
```

### Events
#### El Methods / Events / doubleclick ([top](#table-of-contents))

A listener which is triggered when the user double clicks on an element.

- `on('doubleclick', [ Function ])`

#### El Methods / Events / off ([top](#table-of-contents))

This is an interface for `removeEventListener`, with the main difference being that you don't have to pass a function as a second argument. And when no second argument is passed, all functions associated with the event will be removed.

```javascript
var element = el('div');

function logToConsole() {
  console.log('click');
}

element.on('click', logToConsole);
```

By clicking on `element` 'click' will be logged to the console.

```javascript
element.off('click', logToConsole);
```
In this example, we are attaching 3 functions to `element`

```javascript
element.on('click', click1);
element.on('click', click2);
element.on('click', click3);
```
We will now remove all event listeners attached to the `click` event by passing nothing as a second argument.

```javascript
element.off('click');
```

#### El Methods / Events / on ([top](#table-of-contents))

This is an interface for `addEventListener`, with the main difference being how functions are tracked internally.

```javascript
var element = el('div');

element.on('click', function () {
  console.log('click');
});

div.appendTo(document.body);
```
Now when you click on the element, it will log `click` to the console.

#### El Methods / Events / once ([top](#table-of-contents))

Will add an event listener which will execute once, then remove the listener.

```javascript
var element = el('div');

element.once('click', function () {
  console.log('click');
});

div.appendTo(document.body);
```
Now when you click on the element, it will log `click` to the console. Any additional clicks will not trigger the event.

#### El Methods / Events / trigger ([top](#table-of-contents))

This will trigger all listeners for matching event name.

```javascript
var node = el('div');

el.on('click', function myClickHandler() {
  // Do something
});

el.on('click', function myClickSecondHandler() {
  // Do something
});

el.trigger('click');
// -> will execute 'myClickHandler' and 'myClickSecondHandler'
```

#### El Methods / Events / Input ([top](#table-of-contents))

Input has been unified across browsers, so that when you use `on('input')` you will have consistent performance on Internet Explorer, Chrome and Firefox.

In this example, we'll write a component to replace creating an input with `el('input', { type : 'text' })` with a Component, so that the API becomes `el(Editbox)`.

```javascript
function Editbox() {
  var self = this;
  this.node = {
    document : el('input',
      {
        type : 'text',
        onInput : function (e) {
          self.trigger('input', e);
        }
      }
    )
  };
}

Editbox.prototype.value = function (value) {
  var f = this.node.document.value;
  if (!value) {
    return f();
  }
  f(value);
};

var a = el(Editbox, {
  onInput : function (e) {
    console.log(this.value());
  }
});

```

#### El Methods / Events / Drag And Drop ([top](#table-of-contents))

- `on('dragstart', [ Function ])`
- `on('dragmove', [ Function ])`
- `on('dragend', [ Function ])`

You must access the `detail` property to get `pageX` and `pageY` properties.

Additional properties:

- `startX`
- `startY`
- `distanceX`
- `distanceY`

### `startX` and `startY`

The `X` and `Y` position of where drag started

### `distanceX` and `distanceY`

The distance travelled in `pixels` between the start position and the current position.

### Predicates
#### El Methods / Predicates / contains ([top](#table-of-contents))

```javascript
var a;
var p = el('div', [
  a = el('div')
]);

p.contains(a);
// -> true
```

Can also accept multiple arguments

```javascript
var a;
var b;

var p = el('div',
  a = el('div'),
  b = el('div')
);

p.contains(a, b);
// -> true
```

Can also accept an array

```javascript
var a;
var b;
var c;

var p = el('div',
  a = el('div'),
  b = el('div'),
  c = el('div')
);

// This is valid
p.contains([a, b, c]);
// is is this
p.contains([a, b] c);

// They will both return 'true'
```

#### El Methods / Predicates / hasClass ([top](#table-of-contents))

Returns `boolean` value for whether a `Node` has a className.

```javascript
var a = el('div', { className : 'test' });
a.hasClass('test')
// -> true
```

#### El Methods / Predicates / hasParent ([top](#table-of-contents))

```javascript
var myParent = el('div', [
  var myChild = el('div')
]);

myChild.hasParent(myParent);
// -> true
```

#### El Methods / Predicates / isChecked ([top](#table-of-contents))

Returns a `[ Boolean ]` value of the checked state of a node.

```javascript
var a = el('input', { type : 'checkbox' });
a.check();
a.isChecked();
// -> false
```

#### El Methods / Predicates / isFocused ([top](#table-of-contents))

```javascript
var myFocus = el('label', { tabIndex : 0 });

myFocus.isFocused();
// -> false

myFocus.focus();

myFocus.isFocused();
// -> true
```

#### El Methods / Predicates / isVisible ([top](#table-of-contents))

This one requires a bit of explaining, it doesn't only check for 'visibility'.

- Checks that the node isn't off screen.
- Or that it's `display` property isn't set to `none`.
- Or that `overflow` isn't set to `hidden` and ensures the `height` and `width` are larger than 0.

```javascript
var myNode = el('div', {
  style : {
    position : 'absolute',
    left : 0,
    top : 0
  }
}).appendTo(document.body);

myFocus.isVisible(); [top](#methods)
// -> true

myFocus.style('left', -100000);

myFocus.isVisible();
// -> false
```

Or

```javascript
var myNode = el('div').appendTo(document.body);

myFocus.isVisible();
// -> true

myFocus.style('display', 'none');

myFocus.isVisible();
// -> false
```

The idea here is that this check is smart, so it knows whether the node is visible or not in various contexts.

### Query
#### El Methods / Query / children ([top](#table-of-contents))

Returns an array of direct descendants wrapped in the `el` constructor. This is an interface for `childNodes` with a filter for a `NodeType` equal to `1` (`HTMlElement`)

```javascript
var a = el('div', [
  el('div', { className : 'child-1' }),
  el('div', { className : 'child-2' }),
  el('div', { className : 'child-3' })
]);

a.children();
```

```html
<div class="child-1"></div>
<div class="child-2"></div>
<div class="child-3"></div>
```

You can also specify an index

```javascript
a.children(0);
// -> <div class="child-1"></div>
```

You can also use negative numbers

```javascript
a.children(-1);
// -> <div class="child-3"></div>
```

You can also `slice` the child array

```javascript
a.children(1, -1);
// -> <div class="child-2"></div>
// -> <div class="child-3"></div>
```

#### El Methods / Query / closest ([top](#table-of-contents))

Returns the closest parent matching the query.

```javascript
var farthest;
var parent = el('div', { className : 'closest' }, [
  farthest = el('div', { className : 'farthest' })
]);

farthest.closest('.closest');

// -> HTML Element : div.closest
```

#### El Methods / Query / find ([top](#table-of-contents))

Returns an array of matches as a result of executing the query.

```javascript
var parent = el('div', { className : 'closest' }, [
  el('div', { className : 'find' }),
  el('div', { className : 'find' })
]);

parent.find('.find');
// -> HTML NodeList : [ div.find, div.find ]
```

#### El Methods / Query / getSelector ([top](#table-of-contents))

Returns a `String` selector for the selected node.

```javascript
var parent = el('div', {
  className : 'closest',
  tabIndex : 0,
  id : 'my-id'
});

parent.getSelector();
// -> HTML NodeList : div.closest#my-id[tabindex="0"]
```

#### El Methods / Query / hasClass ([top](#table-of-contents))

```javascript
var node = document.querySelector('.class-name');
el(node).hasClass('class-name');
// -> true
```

#### El Methods / Query / offset ([top](#table-of-contents))

Returns the `top`, `left`, `width`, `height` relative to the `body`'s coordinates. It is an interface for `this.node.getBoundingClientRect()`

```javascript
var parent = el('div');

parent.appendTo(document.body);

parent.offset();
/* -> {
        height : [Number],
        left : [Number],
        top : [Number],
        width : [Number]
      }
*/
```

#### El Methods / Query / parent ([top](#table-of-contents))

If the `node` has a parent, it will return it's parent. Otherwise, it will return `false`

```javascript
var child = el('div');

child.parent();
// -> false

child.appendTo(document.body);
child.parent();
// -> HTML Element : document.body
```

#### El Methods / Query / parents ([top](#table-of-contents))

Returns an array of parents, from first to last.

```javascript
var child;

el('div', { className : 'parent-1' }, [
  el('div', { className : 'parent-2' }, [
    child = el('div', { className : 'parent-3 '})
  ])
]);

child.parents();
// -> [Array]
```

#### El Methods / Query / parentsUntil ([top](#table-of-contents))

Takes a predicate as an argument and returns the first `truthy` match.

```javascript
div.parentsUntil(function (p) { return p.tagName === 'h1' });
```

#### El Methods / Query / scrollWidth ([top](#table-of-contents))

Returns the scrollWidth property of a `node`.

```javascript
node.scrollWidth();
// -> Number
```

#### El Methods / Query / selectorPath ([top](#table-of-contents))

Returns a selector path to the selected node.

```javascript
var child;

el('div', { className : 'parent-1' }, [
  el('div', { className : 'parent-2' }, [
    child = el('div', { className : 'parent-3 '})
  ])
]);

child.selectorPath();
// -> div.parent-3 div.parent-2 div.parent-1
```

If any of the parents has an ID, the path algorithm will terminate.

```javascript
var child;

el('div', { className : 'parent-1' }, [
  el('div', { id : 'super-parent', className : 'parent-2' }, [
    child = el('div', { className : 'parent-3 '})
  ])
]);

child.selectorPath();
// -> div.parent-2#super-parent div.parent-1
```

#### El Methods / Query / siblings ([top](#table-of-contents))

Returns a selected Node and it's siblings filtered to show only nodes of type `1`, which are HTML element nodes, this excludes text nodes.

```javascript
var selected;

el('div', { className : 'parent-1' }, [
  selected = el('div', { className : 'sibling-1' }),
  el('div', { className : 'sibling-2' }),
  el('div', { className : 'sibling-3' }),
  el('div', { className : 'sibling-4' })
]);

selected.siblings();
```

```html
<div class="siblings-1"></div>
<div class="siblings-2"></div>
<div class="siblings-3"></div>
<div class="siblings-4"></div>
```

#### El Methods / Query / textNodes ([top](#table-of-contents))

Returns all the `Text Nodes` which are a child of a selected node.

```javascript
var selected = el('div', { className : 'parent-1' }, ['text node']);
selected.textNodes();
// -> [Text Node]
```

***

## Tests

```

   1. append ............................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:42:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

   2. before ............................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:43:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

   3. attr .............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:44:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

   4. emptyAttr ......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:45:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

   5. children .......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:46:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

   6. childrenFirst ..................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:47:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

   7. childrenSlice ..................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:48:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

   8. clone ............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:49:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

   9. closest ........................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:50:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  10. containsArray ..................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:51:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  11. componentNames .................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:52:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  12. disable ........................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:53:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  13. find .............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:54:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  14. focus ............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:55:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  15. getSelector ....................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:56:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  16. hasClass .......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:57:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  17. hasParent ......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:58:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  18. hasParentBody ..................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:59:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  19. isDisabled ........................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:60:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  20. isVisible ......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:61:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  21. off ............................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:62:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  22. offset ............................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:63:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  23. on ................................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:64:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  24. onMount ........................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:65:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  25. onUnmount ......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:66:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  26. once .............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:67:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  27. parent ............................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:68:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  28. parents ........................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:69:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  29. prepend ........................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:70:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  30. prependTo ......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:71:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  31. remove ............................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:72:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  32. removeClass ....................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:73:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  33. removeChild ....................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:74:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  34. removeClassArray .................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:75:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  35. replaceWith ....................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:76:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  36. select ............................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:77:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  37. selectorPath ...................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:78:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  38. siblings .......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:79:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  39. scrollWidth ....................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:80:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  40. text .............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:81:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  41. textNodes ......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:82:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  42. toggleClass ....................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:83:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  43. trigger ........................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:84:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  44. value ............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:85:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  45. fn ................................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:86:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  46. style ............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:87:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  47. style_object ...................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:88:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  48. uncheck ........................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:89:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  49. check ............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:90:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  50. name .............................................................. 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:91:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  51. component ......................................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:92:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  52. componentWithClassAndChildren ..................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:93:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  53. componentWithRenderMethod ......................................... 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:94:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  54. componentCheckChildren ............................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:95:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true

  55. componentWithNames ................................................ 🚫

 +   Left: "WebDriverError: unknown error: el is not defined
  (Session info: chrome=55.0.2883.95)
  (Driver info: chromedriver=2.24.417412 (ac882d3ce7c0d99292439bf3405780058fcca0a6),platform=Mac OS X 10.11.6 x86_64)
    at WebDriverError (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:27:5)
    at Object.checkLegacyResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/error.js:505:15)
    at parseHttpResponse (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:396:13)
    at doSend.then.response (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/http.js:328:11)
    at process._tickCallback (internal/process/next_tick.js:103:7)
From: Task: WebDriver.executeScript()
    at Driver.schedule (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:414:17)
    at Driver.executeScript (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/webdriver.js:563:16)
    at testDriver (/Users/sean/Dropbox/projects/createNode/test/index.js:17:6)
    at /Users/sean/Dropbox/projects/createNode/test/index.js:96:7
    at ManagedPromise.invokeCallback_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:1315:14)
    at TaskQueue.execute_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2736:14)
    at TaskQueue.executeNext_ (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2719:21)
    at asyncRun (/Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:2595:27)
    at /Users/sean/Dropbox/projects/createNode/node_modules/selenium-webdriver/lib/promise.js:639:7
    at process._tickCallback (internal/process/next_tick.js:103:7)"
 -  Right:                                                              true
```
