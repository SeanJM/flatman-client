# Create Node 1.0.1
#### License: [MIT](https://opensource.org/licenses/MIT)

#### ✅ All 38 tests pass

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
  - [el.isComponent](#functional-methods--el-iscomponent-top)

- El Methods

  - Attributes
    - [addClass](#el-methods--attributes--addclass-top)
    - [attr](#el-methods--attributes--attr-top)
    - [removeClass](#el-methods--attributes--removeclass-top)
    - [toggleClass](#el-methods--attributes--toggleclass-top)

  - Dom Manipulation
    - [append](#el-methods--dom-manipulation--append-top)
    - [appendTo](#el-methods--dom-manipulation--appendto-top)
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
    - [text](#el-methods--dom-manipulation--text-top)
    - [value](#el-methods--dom-manipulation--value-top)

  - Events
    - [off](#el-methods--events--off-top)
    - [on](#el-methods--events--on-top)
    - [trigger](#el-methods--events--trigger-top)

  - Predicates
    - [contains](#el-methods--predicates--contains-top)
    - [hasParent](#el-methods--predicates--hasparent-top)
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
    - [selectorPath](#el-methods--query--selectorpath-top)
    - [siblings](#el-methods--query--siblings-top)
    - [styles](#el-methods--query--styles-top)
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

- `appendTo`
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
el(Component,
  el('div'),
  el(Component)
);
```

### Component / The Options Object ([top](#table-of-contents))

You can pass your component any options.

- Keys will be checked for matching methods
- The options will be passed as an argument to the Component constructor
- on* is used to attach event listeners on initialization
- `onmethod` or `onMethod` are treated equally

```
el(Component, {
  class : 'this-class', // Will actually trigger the components `addClass` method
  onclick : function () {}, // onclick and onClick are functionally identical
  onClick : function () {},
  componentMethod : argument // Will be passed as a single argument to your method
  init : [ 'method', 'method' ] // Functions to run last
})
```

### Component / Writing A Component ([top](#table-of-contents))

```javascript
function Component(options) {
  this.node = {};
  this.node.document = el('div',
    this.node.label = el('div', { class : 'text' })
  );
}

Component.prototype.appendTo = function (target) {
  if (typeof target.append === 'function') {
    target.append(this.node.document);

    this.trigger('appendto');  

    if (this.node.document.hasParent('body')) {
      this.trigger('body');
    }
  } else {
    throw 'Invalid target: "' + target.constructor.name + '"';
  }
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

// A function to add the minimum prototypes to a constructor
Component.extend = function (Constructor) {
  Constructor.prototype.appendTo = Component.prototype.appendTo;
  Constructor.prototype.addClass = Component.prototype.addClass;
  Constructor.prototype.on = Component.prototype.on;
};
```

- Putting it together

```javascript
el(Component, {
    class : 'my-component-class',

    onClick : function () {
      // What it does when it's clicked on
    },
    onAppendTo : function () {
      // What it does when it's appended
    },
    onBody : function () {
      // What it does when it's appended to the body
    }
  },
  'My Text'
);
```

## Examples
### Examples / Nesting ([top](#table-of-contents))

```javascript
el('div',
  el('div', { class : 'child'}),
  el('div', { class : 'child-2'})
);
```

### Examples / Basic Usage ([top](#table-of-contents))

```javascript
el('div', { class : 'my-class-name' }, 'some text');
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
  class : 'some-class-name',
  style : 'background: red'
});
```
```html
<div class="some-class-name" style="background: red"></div>
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
var myDIV = el();
myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```

### Dom Manipulation
#### El Methods / Dom Manipulation / append ([top](#table-of-contents))

Is an interface for `appendChild`, the result being a way to add a `Node` to a parent `Node`.

```javascript
var parent = el({ class : 'parent-1' });
var child = el({ class : 'child-1' });
parent.append(child);
```

is the same as

```javascript
var parent = el({ class : 'parent-1' },
  el({ class : 'child-1' })
);
```

```javascript
el({ class : 'parent-1' }).append(
  el({ class : 'child-1' })
);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
</div>
```

You can also pass as many valid elements as you want to `append`

```javascript
var parent = el({ class : 'parent-1' });
var child1 = el({ class : 'child-1' });
var child2 = el({ class : 'child-2' });

parent.append(
  child1,
  child2
);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
  <div class="child-2"></div>
</div>
```

#### El Methods / Dom Manipulation / appendTo ([top](#table-of-contents))

Is an interface for `appendChild`, the result being a way to add a child `Node` to a parent `Node`.

```javascript
var parent = el('div', { class : 'parent-1' });
var child = el('div', { class : 'child-1' });
child.appendTo(parent);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
</div>
```

#### El Methods / Dom Manipulation / clone ([top](#table-of-contents))

Clones an element, is an interface for `Node.cloneNode(true)`

```javascript
var a = el('div',
  el('div', { class : 'child-1' }),
  el('div', { class : 'child-2' }),
  el('div', { class : 'child-3' })
);

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
a.appendTo('body').focus();
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
var parent = el('div', { class : 'parent' },
  el('div', { 'first-child' })
);

var child = el('div', { class : 'second-child' });
```

```html
<div class="parent">
  <div class="first-child"></div>
</div>
```

```javascript
parent.prepend(child);
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
var child = el('div', { class : 'second-child' });
var parent = el('div', { class : 'parent' },
  el('div', { 'first-child' })
);
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
var a = el('div', { class : 'parent' });
var b = el('div', { class : 'first-child' });

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
var newNode = el({ class : 'new-node' });
targetNode.replaceWith(newNode);
```

#### El Methods / Dom Manipulation / select ([top](#table-of-contents))

Proves an interface to select text ranges and get the selected text range in an input.

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

div.appendTo('body');
```
Now when you click on the element, it will log `click` to the console.

#### El Methods / Events / trigger ([top](#table-of-contents))

This will trigger all listeners for matching event name.

```javascript
var node = el();

el.on('click', function myClickHandler() {
  // Do something
});

el.on('click', function myClickSecondHandler() {
  // Do something
});

el.trigger('click');
// -> will execute 'myClickHandler' and 'myClickSecondHandler'
```

### Predicates
#### El Methods / Predicates / contains ([top](#table-of-contents))

```javascript
var a;
var p = el('div',
  a = el('div')
);

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

#### El Methods / Predicates / hasParent ([top](#table-of-contents))

```javascript
var myParent = el('div',
  var myChild = el('div')
);

myChild.hasParent(myParent);
// -> true
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
var a = el('div',
  el('div', { class : 'child-1' }),
  el('div', { class : 'child-2' }),
  el('div', { class : 'child-3' })
);

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
var parent = el('div', { class : 'closest' },
  farthest = el('div', { class : 'farthest' })
);

farthest.closest('.closest');

// -> HTML Element : div.closest
```

#### El Methods / Query / find ([top](#table-of-contents))

Returns an array of matches as a result of executing the query.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find' }),
  el('div', { class : 'find' })
);

parent.find('.find');
// -> HTML NodeList : [ div.find, div.find ]
```

#### El Methods / Query / getSelector ([top](#table-of-contents))

Returns a `String` selector for the selected node.

```javascript
var parent = el('div', {
  class : 'closest',
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

el('div', { class : 'parent-1' },
  el('div', { class : 'parent-2' },
    child = el('div', { class : 'parent-3 '})
  )
);

child.parents();
// -> [Array]
```

#### El Methods / Query / parentsUntil ([top](#table-of-contents))

Takes a predicate as an argument and returns the first `truthy` match.

```javascript
div.parentsUntil(function (p) { return p.tagName === 'h1' });
```

#### El Methods / Query / selectorPath ([top](#table-of-contents))

Returns a selector path to the selected node.

```javascript
var child;

el('div', { class : 'parent-1' },
  el('div', { class : 'parent-2' },
    child = el('div', { class : 'parent-3 '})
  )
);

child.selectorPath();
// -> div.parent-3 div.parent-2 div.parent-1
```

If any of the parents has an ID, the path algorithm will terminate.

```javascript
var child;

el('div', { class : 'parent-1' },
  el('div', { id : 'super-parent', class : 'parent-2' },
    child = el('div', { class : 'parent-3 '})
  )
);

child.selectorPath();
// -> div.parent-2#super-parent div.parent-1
```

#### El Methods / Query / siblings ([top](#table-of-contents))

Returns a selected Node and it's siblings filtered to show only nodes of type `1`, which are HTML element nodes, this excludes text nodes.

```javascript
var selected;

el('div', { class : 'parent-1' },
  selected = el('div', { class : 'sibling-1' }),
  el('div', { class : 'sibling-2' }),
  el('div', { class : 'sibling-3' }),
  el('div', { class : 'sibling-4' })
);

selected.siblings();
```

```html
<div class="siblings-1"></div>
<div class="siblings-2"></div>
<div class="siblings-3"></div>
<div class="siblings-4"></div>
```

#### El Methods / Query / styles ([top](#table-of-contents))

Is an interface for `window.getComputedStyle([node])`, returns an object.

```javascript
div.styles();
// -> [ Object ]
```

#### El Methods / Query / textNodes ([top](#table-of-contents))

Returns all the `Text Nodes` which are a child of a selected node.

```javascript
var selected = el('div', { class : 'parent-1' }, 'text node');
selected.textNodes();
// -> [Text Node]
```

***

## Tests

```
   1. addClass........................................................... ✅
   2. append............................................................. ✅
   3. attr............................................................... ✅
   4. attr (no arguments, returns an object)............................. ✅
   5. children........................................................... ✅
   6. children (first)................................................... ✅
   7. children (slice)................................................... ✅
   8. clone.............................................................. ✅
   9. contains (with array).............................................. ✅
  10. contains (with array).............................................. ✅
  11. disable............................................................ ✅
  12. find............................................................... ✅
  13. focus.............................................................. ✅
  14. getSelector........................................................ ✅
  15. hasClass........................................................... ✅
  16. hasParent.......................................................... ✅
  17. isDisabled......................................................... ✅
  18. isVisible.......................................................... ✅
  19. off................................................................ ✅
  20. offset............................................................. ✅
  21. on................................................................. ✅
  22. parent............................................................. ✅
  23. parents............................................................ ✅
  24. prepend............................................................ ✅
  25. prependTo.......................................................... ✅
  26. remove............................................................. ✅
  27. removeClass........................................................ ✅
  28. removeClass (Array)................................................ ✅
  29. replaceWith........................................................ ✅
  30. select............................................................. ✅
  31. selectorPath....................................................... ✅
  32. siblings........................................................... ✅
  33. text............................................................... ✅
  34. textNodes.......................................................... ✅
  35. toggleClass........................................................ ✅
  36. trigger............................................................ ✅
  37. value.............................................................. ✅
  38. fn................................................................. ✅
```
