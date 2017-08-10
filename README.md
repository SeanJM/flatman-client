# Flatman Client 1.7.1
#### License: [MIT](https://opensource.org/licenses/MIT)

#### ✅ All 86 tests pass

## Table of Contents

#### Overview


- Description
  - [Description](#--description-top)

- Installation
  - [Installation](#--installation-top)

- Notes
  - [Notes](#--notes-top)

- Component

  - Initialing A Component
    - [Initialing A Component](#--component--initialing-a-component-top)

  - Mixing A Component
    - [Mixing A Component](#--component--mixing-a-component-top)

  - The Options Object
    - [The Options Object](#--component--the-options-object-top)

  - Writing A Component
    - [Writing A Component](#--component--writing-a-component-top)

- Examples

  - Nesting
    - [Nesting](#--examples--nesting-top)

  - Basic Usage
    - [Basic Usage](#--examples--basic-usage-top)

  - Wrapping The Dom
    - [Wrapping The Dom](#--examples--wrapping-the-dom-top)

  - What You Can Pass As An Object
    - [What You Can Pass As An Object](#--examples--what-you-can-pass-as-an-object-top)

- Functional Methods

  - Basics
    - [Basics](#--functional-methods--basics-top)

  - el.addClass
    - [el.addClass](#--functional-methods--el-addclass-top)

  - el.isComponent
    - [el.isComponent](#--functional-methods--el-iscomponent-top)

- El Methods

  - Attributes

    - addClass
      - [addClass](#--el-methods--attributes--addclass-top)

    - attr
      - [attr](#--el-methods--attributes--attr-top)

    - className
      - [className](#--el-methods--attributes--classname-top)

    - copy
      - [copy](#--el-methods--attributes--copy-top)

    - name
      - [name](#--el-methods--attributes--name-top)

    - removeClass
      - [removeClass](#--el-methods--attributes--removeclass-top)

    - scrollHeight
      - [scrollHeight](#--el-methods--attributes--scrollheight-top)

    - scrollTop
      - [scrollTop](#--el-methods--attributes--scrolltop-top)

    - scrollWidth
      - [scrollWidth](#--el-methods--attributes--scrollwidth-top)

    - toggleClass
      - [toggleClass](#--el-methods--attributes--toggleclass-top)

  - Dom Manipulation

    - append
      - [append](#--el-methods--dom-manipulation--append-top)

    - appendTo
      - [appendTo](#--el-methods--dom-manipulation--appendto-top)

    - before
      - [before](#--el-methods--dom-manipulation--before-top)

    - check
      - [check](#--el-methods--dom-manipulation--check-top)

    - clone
      - [clone](#--el-methods--dom-manipulation--clone-top)

    - disable
      - [disable](#--el-methods--dom-manipulation--disable-top)

    - enable
      - [enable](#--el-methods--dom-manipulation--enable-top)

    - focus
      - [focus](#--el-methods--dom-manipulation--focus-top)

    - html
      - [html](#--el-methods--dom-manipulation--html-top)

    - prepend
      - [prepend](#--el-methods--dom-manipulation--prepend-top)

    - prependTo
      - [prependTo](#--el-methods--dom-manipulation--prependto-top)

    - remove
      - [remove](#--el-methods--dom-manipulation--remove-top)

    - removeChild
      - [removeChild](#--el-methods--dom-manipulation--removechild-top)

    - replaceWith
      - [replaceWith](#--el-methods--dom-manipulation--replacewith-top)

    - select
      - [select](#--el-methods--dom-manipulation--select-top)

    - style
      - [style](#--el-methods--dom-manipulation--style-top)

    - text
      - [text](#--el-methods--dom-manipulation--text-top)

    - uncheck
      - [uncheck](#--el-methods--dom-manipulation--uncheck-top)

    - value
      - [value](#--el-methods--dom-manipulation--value-top)

  - Events

    - doubleclick
      - [doubleclick](#--el-methods--events--doubleclick-top)

    - off
      - [off](#--el-methods--events--off-top)

    - on
      - [on](#--el-methods--events--on-top)

    - once
      - [once](#--el-methods--events--once-top)

    - trigger
      - [trigger](#--el-methods--events--trigger-top)

    - Input
      - [Input](#--el-methods--events--input-top)

    - Drag And Drop
      - [Drag And Drop](#--el-methods--events--drag-and-drop-top)

  - Predicates

    - contains
      - [contains](#--el-methods--predicates--contains-top)

    - hasClass
      - [hasClass](#--el-methods--predicates--hasclass-top)

    - hasParent
      - [hasParent](#--el-methods--predicates--hasparent-top)

    - isChecked
      - [isChecked](#--el-methods--predicates--ischecked-top)

    - isFocused
      - [isFocused](#--el-methods--predicates--isfocused-top)

    - isVisible
      - [isVisible](#--el-methods--predicates--isvisible-top)

  - Query

    - children
      - [children](#--el-methods--query--children-top)

    - closest
      - [closest](#--el-methods--query--closest-top)

    - find
      - [find](#--el-methods--query--find-top)

    - hasClass
      - [hasClass](#--el-methods--query--hasclass-top)

    - offset
      - [offset](#--el-methods--query--offset-top)

    - parent
      - [parent](#--el-methods--query--parent-top)

    - parents
      - [parents](#--el-methods--query--parents-top)

    - parentsUntil
      - [parentsUntil](#--el-methods--query--parentsuntil-top)

    - scrollWidth
      - [scrollWidth](#--el-methods--query--scrollwidth-top)

    - siblings
      - [siblings](#--el-methods--query--siblings-top)

    - textNodes
      - [textNodes](#--el-methods--query--textnodes-top)
- [Tests](#tests)

## Description
### Description.md ([top](#table-of-contents))

- Create nodes with a simple interface which will be very familiar.
- Get an API to simplify DOM manipulation
- Plugin architecture to extend the prototype

Thanks to [FRZR](https://frzr.js.org/) for some help for clearing up the "child" problem https://freezer.js.org/minimum-viable-view-library/
## Installation
### Installation.md ([top](#table-of-contents))

Include the script in your `body` tag, or `head`, I think it's wise to place it in the `body`, at the bottom.

```HTML
<script src="createNode.min.js"></script>
```

## Notes
### Notes.md ([top](#table-of-contents))

I use this on production, and I would like some help on it. Thanks. The goal is to keep it as simple and light as possible. It's a bit of a bastard child between FRZR and jQuery — a somewhat attractive & useful bastard.

## Component
### Initialing A Component
#### Component / Initialing A Component.md ([top](#table-of-contents))

The most basic way to initialize a component is like this:

```javascript
el('Component')
```

It takes the same type of arguments that a regular `el` takes.

A component and an element are designed to be similar. This means you can do things like this:

```javascript
el('Component', [
  el('div'),
  el(Component)
]);
```

### Mixing A Component
#### Component / Mixing A Component.md ([top](#table-of-contents))

### Special considerations

Wrapped components cannot share method names which are shared with 'el()' node. They will be excluded.

```javascript
Component.create('interior', {
  myExposedMethod() {
    // Do stuff
  },

  render() {
    return el('div', {
      name : 'interior',
      className : 'component'
    });
  }
});

Component.create('my-component', Component.wrap('interior', {
  constructor(props) {
    // Set my stuff
  },

  thisMethod() {
    // do stuff
  },

  onHover() {
    // Do stuff
    this.node.name.trigger('hover');
  },

  render(props) {
    el('div', {
      onClick : props.onClick,
      onHover : () => this.onHover()
    }, [
      props.component // <-- The 'interior' component
    ])
  }
}));
```

```javascript
var a = el('my-component');

a.myExposedMethod();
a.thisMethod();
```

### The Options Object
#### Component / The Options Object.md ([top](#table-of-contents))

You can pass your component any options.

- Keys will be checked for matching methods
- The options will be passed as an argument to the Component constructor

```
el('Component', {
  className : 'this-class',
  onClick : function () {},
})
```

### Writing A Component
#### Component / Writing A Component.md ([top](#table-of-contents))

```javascript
Component.create('my-component', {
  constructor(props) {
    // Set my stuff
  },

  onHover() {
    // Do stuff
  },

  touchInner() {
    this.node.inner.trigger('touch');
  },

  render(props) {
    el('div', {
      onClick : props.onClick,
      onHover : () => this.onHover()
    }, [
      // Names will be added as a reference to 'this.node',
      // name : 'inner' becomes this.node.inner
      el('div', { name : 'inner' })
    ])
  }
});
```

## Examples
### Nesting
#### Examples / Nesting.md ([top](#table-of-contents))

```javascript
el('div', [
  el('div', { className : 'child'}),
  el('div', { className : 'child-2'})
]);
```

### Basic Usage
#### Examples / Basic Usage.md ([top](#table-of-contents))

```javascript
el('div', { className : 'my-class-name' }, ['some text']);
```

### Wrapping The Dom
#### Examples / Wrapping The Dom.md ([top](#table-of-contents))

You can get all the methods and the simplified interface based on ideas in jQuery by wrapping a node in `el`.

```javascript
var wrapped = el(document.querySelector('#my-div'));
```

### What You Can Pass As An Object
#### Examples / What You Can Pass As An Object.md ([top](#table-of-contents))

- You can pass it anything which has an `appendTo` method

## Functional Methods
### Basics
#### Functional Methods / Basics.md ([top](#table-of-contents))

## Functional interfaces
- `el.contains`
- `el.fn`
- `el.hasParent`
- `el.isComponent`
- `el.isCreateNode`
- `el.isElement`
- `el.isVisible`

### el.addClass
#### Functional Methods / el.addClass.md ([top](#table-of-contents))

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

### el.isComponent
#### Functional Methods / el.isComponent.md ([top](#table-of-contents))

Returns `true` or `false` if the argument is a component

## El Methods
### Attributes
#### addClass
##### El Methods / Attributes / addClass.md ([top](#table-of-contents))

Will add a class to a node, and will check if the class does not exist before adding.

```javascript
el('div').addClass('this-class-name');
```

#### attr
##### El Methods / Attributes / attr.md ([top](#table-of-contents))

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

#### className
##### El Methods / Attributes / className.md ([top](#table-of-contents))

Will set or return value of the attribute `class` for a `Node`.

```javascript
var b = el('div');

a.className('test');

a.className();
//-> test
```

#### copy
##### El Methods / Attributes / copy.md ([top](#table-of-contents))

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

#### name
##### El Methods / Attributes / name.md ([top](#table-of-contents))

Will set or return value of the attribute `name` for a `Node`.

```javascript
var b = el('div');

a.name('test');

a.name();
//-> test
```

#### removeClass
##### El Methods / Attributes / removeClass.md ([top](#table-of-contents))

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

#### scrollHeight
##### El Methods / Attributes / scrollHeight.md ([top](#table-of-contents))

Will tell you an elements `scrollHeight` value

```javascript
myDiv.scrollHeight();
// -> Number
```

#### scrollTop
##### El Methods / Attributes / scrollTop.md ([top](#table-of-contents))

Will tell you an elements `scrollTop` value when passed nothing. Will set the node `scrollTop` when passed a number.

```javascript
myDiv.scrollTop();
// -> Number
```

```javascript
myDiv.scrollTop(20);
// -> [ELEMENT]
```

#### scrollWidth
##### El Methods / Attributes / scrollWidth.md ([top](#table-of-contents))

Will tell you an elements `scrollWidth` value

```javascript
myDiv.scrollWidth();
// -> Number
```

#### toggleClass
##### El Methods / Attributes / toggleClass.md ([top](#table-of-contents))

Will toggle a class name on a node. If the class exists, it will be removed, if it does not exist, it will be added.

```javascript
var myDIV = el('div');
myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```

### Dom Manipulation
#### append
##### El Methods / Dom Manipulation / append.md ([top](#table-of-contents))

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

#### appendTo
##### El Methods / Dom Manipulation / appendTo.md ([top](#table-of-contents))

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

#### before
##### El Methods / Dom Manipulation / before.md ([top](#table-of-contents))

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

#### check
##### El Methods / Dom Manipulation / check.md ([top](#table-of-contents))

Check a checkbox and radio

```javascript
var a = el('input', { type : 'checkbox' });

a.check();
a.isChecked();
// -> true
```

#### clone
##### El Methods / Dom Manipulation / clone.md ([top](#table-of-contents))

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

#### disable
##### El Methods / Dom Manipulation / disable.md ([top](#table-of-contents))

Disables an element by setting it's `disabled` attribute to `disabled`

```javascript
var a = el('div').disable();
```

Result

```html
<div disabled="disabled"></div>
```

#### enable
##### El Methods / Dom Manipulation / enable.md ([top](#table-of-contents))

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

#### focus
##### El Methods / Dom Manipulation / focus.md ([top](#table-of-contents))

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

#### html
##### El Methods / Dom Manipulation / html.md ([top](#table-of-contents))

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

#### prepend
##### El Methods / Dom Manipulation / prepend.md ([top](#table-of-contents))

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

#### prependTo
##### El Methods / Dom Manipulation / prependTo.md ([top](#table-of-contents))

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

#### remove
##### El Methods / Dom Manipulation / remove.md ([top](#table-of-contents))

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

#### removeChild
##### El Methods / Dom Manipulation / removeChild.md ([top](#table-of-contents))

Will remove a child `Node`.

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
a.removeChild(b);
```

```html
<div class="parent">
</div>
```

#### replaceWith
##### El Methods / Dom Manipulation / replaceWith.md ([top](#table-of-contents))

Replaces a target node with a new node.

```javascript
var targetNode = el(document.querySelector('.target-node'));
var newNode = el('div', { className : 'new-node' });
targetNode.replaceWith(newNode);
```

#### select
##### El Methods / Dom Manipulation / select.md ([top](#table-of-contents))

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

#### style
##### El Methods / Dom Manipulation / style.md ([top](#table-of-contents))

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

#### text
##### El Methods / Dom Manipulation / text.md ([top](#table-of-contents))

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

#### uncheck
##### El Methods / Dom Manipulation / uncheck.md ([top](#table-of-contents))

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

#### value
##### El Methods / Dom Manipulation / value.md ([top](#table-of-contents))

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
#### doubleclick
##### El Methods / Events / doubleclick.md ([top](#table-of-contents))

A listener which is triggered when the user double clicks on an element.

- `on('doubleclick', [ Function ])`

#### off
##### El Methods / Events / off.md ([top](#table-of-contents))

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

#### on
##### El Methods / Events / on.md ([top](#table-of-contents))

This is an interface for `addEventListener`, with the main difference being how functions are tracked internally.

```javascript
var element = el('div');

element.on('click', function () {
  console.log('click');
});

div.appendTo(document.body);
```
Now when you click on the element, it will log `click` to the console.

#### once
##### El Methods / Events / once.md ([top](#table-of-contents))

Will add an event listener which will execute once, then remove the listener.

```javascript
var element = el('div');

element.once('click', function () {
  console.log('click');
});

div.appendTo(document.body);
```
Now when you click on the element, it will log `click` to the console. Any additional clicks will not trigger the event.

#### trigger
##### El Methods / Events / trigger.md ([top](#table-of-contents))

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

#### Input
##### El Methods / Events / Input.md ([top](#table-of-contents))

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

#### Drag And Drop
##### El Methods / Events / Drag And Drop.md ([top](#table-of-contents))

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
#### contains
##### El Methods / Predicates / contains.md ([top](#table-of-contents))

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

#### hasClass
##### El Methods / Predicates / hasClass.md ([top](#table-of-contents))

Returns `boolean` value for whether a `Node` has a className.

```javascript
var a = el('div', { className : 'test' });
a.hasClass('test')
// -> true
```

#### hasParent
##### El Methods / Predicates / hasParent.md ([top](#table-of-contents))

```javascript
var myParent = el('div', [
  var myChild = el('div')
]);

myChild.hasParent(myParent);
// -> true
```

#### isChecked
##### El Methods / Predicates / isChecked.md ([top](#table-of-contents))

Returns a `[ Boolean ]` value of the checked state of a node.

```javascript
var a = el('input', { type : 'checkbox' });
a.check();
a.isChecked();
// -> false
```

#### isFocused
##### El Methods / Predicates / isFocused.md ([top](#table-of-contents))

```javascript
var myFocus = el('label', { tabIndex : 0 });

myFocus.isFocused();
// -> false

myFocus.focus();

myFocus.isFocused();
// -> true
```

#### isVisible
##### El Methods / Predicates / isVisible.md ([top](#table-of-contents))

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
#### children
##### El Methods / Query / children.md ([top](#table-of-contents))

Returns an array of direct descendants wrapped in the `el` constructor. This is an interface for `childNodes` with a filter for a `NodeType` equal to `1` (`HTMlElement`)

```javascript
var a = el('div', [
  el('div', { className : 'child-1' }),
  el('div', { className : 'child-2' }),
  el('div', { className : 'child-3' })
]);

a.childNodes;
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

#### closest
##### El Methods / Query / closest.md ([top](#table-of-contents))

Returns the closest parent matching the query.

```javascript
var farthest;
var parent = el('div', { className : 'closest' }, [
  farthest = el('div', { className : 'farthest' })
]);

farthest.closest('.closest');

// -> HTML Element : div.closest
```

#### find
##### El Methods / Query / find.md ([top](#table-of-contents))

Returns an array of matches as a result of executing the query.

```javascript
var parent = el('div', { className : 'closest' }, [
  el('div', { className : 'find' }),
  el('div', { className : 'find' })
]);

parent.find('.find');
// -> HTML NodeList : [ div.find, div.find ]
```

#### hasClass
##### El Methods / Query / hasClass.md ([top](#table-of-contents))

```javascript
var node = document.querySelector('.class-name');
el(node).hasClass('class-name');
// -> true
```

#### offset
##### El Methods / Query / offset.md ([top](#table-of-contents))

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

#### parent
##### El Methods / Query / parent.md ([top](#table-of-contents))

If the `node` has a parent, it will return it's parent. Otherwise, it will return `false`

```javascript
var child = el('div');

child.parent();
// -> false

child.appendTo(document.body);
child.parent();
// -> HTML Element : document.body
```

#### parents
##### El Methods / Query / parents.md ([top](#table-of-contents))

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

#### parentsUntil
##### El Methods / Query / parentsUntil.md ([top](#table-of-contents))

Takes a predicate as an argument and returns the first `truthy` match.

```javascript
div.parentsUntil(function (p) { return p.tagName === 'h1' });
```

#### scrollWidth
##### El Methods / Query / scrollWidth.md ([top](#table-of-contents))

Returns the scrollWidth property of a `node`.

```javascript
node.scrollWidth();
// -> Number
```

#### siblings
##### El Methods / Query / siblings.md ([top](#table-of-contents))

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

#### textNodes
##### El Methods / Query / textNodes.md ([top](#table-of-contents))

Returns all the `Text Nodes` which are a child of a selected node.

```javascript
var selected = el('div', { className : 'parent-1' }, ['text node']);
selected.textNodes();
// -> [Text Node]
```

***

## Tests

```
    1. addClass............................................................ ✅
    2. after............................................................... ✅
    3. after_single_child.................................................. ✅
    4. append.............................................................. ✅
    5. appendTo............................................................ ✅
    6. appendTo_onMount.................................................... ✅
    7. append_component.................................................... ✅
    8. append_single_node.................................................. ✅
    9. append_undefined.................................................... ✅
   10. attr................................................................ ✅
   11. before.............................................................. ✅
   12. before_single_child................................................. ✅
   13. check............................................................... ✅
   14. children............................................................ ✅
   15. childrenFirst....................................................... ✅
   16. childrenReplace..................................................... ✅
   17. childrenSlice....................................................... ✅
   18. classList........................................................... ✅
   19. classList_svg....................................................... ✅
   20. clone............................................................... ✅
   21. closest............................................................. ✅
   22. component........................................................... ✅
   23. componentCheckChildren.............................................. ✅
   24. componentNames...................................................... ✅
   25. componentOnMount.................................................... ✅
   26. componentWithClassAndChildren....................................... ✅
   27. componentWithNames.................................................. ✅
   28. componentWithRenderMethod........................................... ✅
   29. containsArray....................................................... ✅
   30. createElement_with_style............................................ ✅
   31. createSVGElement_with_style......................................... ✅
   32. disable............................................................. ✅
   33. emptyAttr........................................................... ✅
   34. find................................................................ ✅
   35. find_predicate...................................................... ✅
   36. find_tagName........................................................ ✅
   37. find_wildcard....................................................... ✅
   38. fn.................................................................. ✅
   39. focus............................................................... ✅
   40. hasClass............................................................ ✅
   41. hasClass_array...................................................... ✅
   42. hasParent........................................................... ✅
   43. hasParentBody....................................................... ✅
   44. is.................................................................. ✅
   45. isDisabled.......................................................... ✅
   46. isFocused........................................................... ✅
   47. isVisible........................................................... ✅
   48. is_wildcard......................................................... ✅
   49. mapChildren......................................................... ✅
   50. name................................................................ ✅
   51. off................................................................. ✅
   52. offset.............................................................. ✅
   53. on.................................................................. ✅
   54. onMount............................................................. ✅
   55. onMount_component................................................... ✅
   56. onUnmount........................................................... ✅
   57. once................................................................ ✅
   58. parent.............................................................. ✅
   59. parents............................................................. ✅
   60. prepend............................................................. ✅
   61. prependTo........................................................... ✅
   62. prepend_component................................................... ✅
   63. remove.............................................................. ✅
   64. removeChild......................................................... ✅
   65. removeClass......................................................... ✅
   66. removeClassArray.................................................... ✅
   67. removeClass_not_there............................................... ✅
   68. replaceWith......................................................... ✅
   69. scrollHeight........................................................ ✅
   70. scrollTop........................................................... ✅
   71. scrollWidth......................................................... ✅
   72. select.............................................................. ✅
   73. siblings............................................................ ✅
   74. style............................................................... ✅
   75. style_clear......................................................... ✅
   76. style_object........................................................ ✅
   77. svg_addClass........................................................ ✅
   78. text................................................................ ✅
   79. textNodes........................................................... ✅
   80. toggleClass......................................................... ✅
   81. trigger............................................................. ✅
   82. uncheck............................................................. ✅
   83. value............................................................... ✅
   84. wrap................................................................ ✅
   85. html_remove-children................................................ ✅
   86. hasClass_array_array-is-className................................... ✅
```
