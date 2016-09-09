# Create Node 0.0.0
#### License: [MIT](https://opensource.org/licenses/MIT)

#### 🐛 No unit tests

## Table of Contents

#### Overview

- [Description](#description)
- [Installation](#installation)
- [Notes](#notes)

- Examples
  - Nesting ... ([top](#table-of-contents))
  - Basic Usage ... ([top](#table-of-contents))
  - Required Methods ... ([top](#table-of-contents))
  - Passing A Component ... ([top](#table-of-contents))
  - Wrapping The Dom ... ([top](#table-of-contents))
  - Writing A Component ... ([top](#table-of-contents))
  - What Can You Pass As An Object ... ([top](#table-of-contents))

- Functional Methods
  - Basics ... ([top](#table-of-contents))
  - El.iscomponent ... ([top](#table-of-contents))

- El Methods

  - Attributes
    - Attr ... ([top](#table-of-contents))

  - Dom Manipulation
    - Addclass ... ([top](#table-of-contents))
    - Append ... ([top](#table-of-contents))
    - Appendto ... ([top](#table-of-contents))
    - Children ... ([top](#table-of-contents))
    - Clone ... ([top](#table-of-contents))
    - Disable ... ([top](#table-of-contents))
    - Focus ... ([top](#table-of-contents))
    - Hasclass ... ([top](#table-of-contents))
    - Prepend ... ([top](#table-of-contents))
    - Removeclass ... ([top](#table-of-contents))
    - Toggleclass ... ([top](#table-of-contents))
    - Dom Manipulation ... ([top](#table-of-contents))

  - Events
    - Off ... ([top](#table-of-contents))
    - On ... ([top](#table-of-contents))

  - Predicates
    - Predicates ... ([top](#table-of-contents))

  - Query
    - Closest ... ([top](#table-of-contents))
    - Find ... ([top](#table-of-contents))
    - Firstchild ... ([top](#table-of-contents))
    - Getselector ... ([top](#table-of-contents))
    - Lastchild ... ([top](#table-of-contents))
    - Offset ... ([top](#table-of-contents))
    - Parent ... ([top](#table-of-contents))
    - Parents ... ([top](#table-of-contents))
    - Parentsuntil ... ([top](#table-of-contents))
    - Selectorpath ... ([top](#table-of-contents))
    - Siblings ... ([top](#table-of-contents))
    - Styles ... ([top](#table-of-contents))
    - Textnodes ... ([top](#table-of-contents))

## Description

- Create nodes with a simple interface which will be very familiar.
- Get an API to simplify DOM manipulation
- Plugin architecture to extend the prototype

Thanks to [FRZR](https://frzr.js.org/) for some help for clearing up the "child" problem https://freezer.js.org/minimum-viable-view-library/

### `el.isComponent` [top](#methods)


## Installation


<!--
  Installation instructions
-->

## Notes


<!--
  Anything 'notable' that the user should know
-->

# Examples
##Nesting ... ([top](#table-of-contents))

```javascript
el('div',
  el('div', { class : 'child'}),
  el('div', { class : 'child-2'})
);
```

##Basic Usage ... ([top](#table-of-contents))

```javascript
el('div', { class : 'my-class-name' }, 'some text');
```

##Required Methods ... ([top](#table-of-contents))

- `appendTo`
- `addClass` when the class key is present
- `on*` when a key matching that pattern is present

You will also get the options object passed to the constructor.

##Passing A Component ... ([top](#table-of-contents))

- `el` works with constructors, it is opinionated and will return errors if your constructor isn't capitalized.
- It takes the same type of arguments that a regular `el` takes.
- The constructor must have an `appendTo` method which will append it to another element.
- Any key which begins with `on...` will trigger the `on` method.
- `onmethod` or `onMethod` are treated equally

The second argument, if it is an `Object` will be passed to the constructor. It will also look for prototype methods which match the key name, when it finds matching prototypes, it will execute them.

```javascript
el(MyComponent, {
    class : 'this-class', // Will actually trigger the components `addClass` method
    onclick : function () {}, // onclick and onClick are functionally identical
    onClick : function () {},
    componentMethod : argument // Will be passed as a single argument to your method
  },
  'text' // Will trigger the `text` method for the component
);
```

##Wrapping The Dom ... ([top](#table-of-contents))

You can get all the methods and the simplified interface based on ideas in jQuery by wrapping a node in `el`.

```javascript
var wrapped = el(document.querySelector('#my-div'));
```

##Writing A Component ... ([top](#table-of-contents))

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

##What Can You Pass As An Object ... ([top](#table-of-contents))

- You can pass it anything which has an `appendTo` method

# Functional Methods
##Basics ... ([top](#table-of-contents))

## Functional interfaces
- `el.contains`
- `el.fn`
- `el.hasParent`
- `el.isComponent`
- `el.isCreateNode`
- `el.isElement`
- `el.isVisible`

##El.iscomponent ... ([top](#table-of-contents))

Returns `true` or `false` if the argument is a component

# El Methods
## Attributes
###Attr ... ([top](#table-of-contents))

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

## Dom Manipulation
###Addclass ... ([top](#table-of-contents))

```javascript
el('div').addClass('this-class-name');
```

###Append ... ([top](#table-of-contents))

Is an interface for `appendChild`, the result being a way to add a `Node` to a parent `Node`.

```javascript
var parent = el('div', { class : 'parent-1' });
var child = el('div', { class : 'child-1' });
parent.append(child);
```

is the same as

```javascript
var parent = el('div', { class : 'parent-1' }, el('div', { class : 'child-1' }));
```

```javascript
el('div', { class : 'parent-1' }).append(el('div', { class : 'child-1' }));
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
</div>
```

You can also pass as many valid elements as you want to `append`

```javascript
var parent = el('div', { class : 'parent-1' });
var child1 = el('div', { class : 'child-1' });
var child2 = el('div', { class : 'child-2' });

parent.append(child1, child2);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
  <div class="child-2"></div>
</div>
```

###Appendto ... ([top](#table-of-contents))

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

### `before` [top](#methods)

Is an interface for `insertBefore`, the result being a way to append a `Node` before it's sibling `Node`.

```javascript
var parent = el('div', { class : 'parent-1' });
var sibling_1 = el('div', { class : 'sibling-1' });
var sibling_2 = el('div', { class : 'sibling-2' });
sibling_1.appendTo(parent);
sibling_2.before(sibling_1);
```

```HTML
<div class="parent-1">
  <div class="sibling-2"></div>
  <div class="sibling-1"></div>
</div>
```

###Children ... ([top](#table-of-contents))

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

###Clone ... ([top](#table-of-contents))

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

###Disable ... ([top](#table-of-contents))

Disables an element by setting it's `disabled` attribute to `disabled`

```javascript
var a = el('div').disable();
```

Result

```html
<div disabled="disabled"></div>
```

### `enable` [top](#methods)

Enables an element by removing it's `disabled` attribute

```html
<div id="disabled" disabled="disabled"></div>
```

```javascript
var a = el(document.getElementById('disabled')).enable();
```

***

```html
<div id="disabled"></div>
```

###Focus ... ([top](#table-of-contents))

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

###Hasclass ... ([top](#table-of-contents))

```javascript
var node = document.querySelector('.class-name');
el(node).hasClass('class-name');
// -> true
```

###Prepend ... ([top](#table-of-contents))

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

***

```javascript
parent.prepend(child);
```
```html
<div class="parent">
  <div class="second-child"></div>
  <div class="first-child"></div>
</div>
```

###Removeclass ... ([top](#table-of-contents))

```html
<div id="copy" class="my-class-name" data-attribute="some-text">
```

```javascript
var node = document.querySelector('#copy');
el('div').removeClass('my-class-name');
```

***

```html
<div id="copy" data-attribute="some-text">
```

###Toggleclass ... ([top](#table-of-contents))

```javascript
var myDIV = el('div');

myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```

###Dom Manipulation ... ([top](#table-of-contents))

### `prependTo` [top](#methods)

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
***

```javascript
child.prependTo(parent);
```
```html
<div class="parent">
  <div class="second-child"></div>
  <div class="first-child"></div>
</div>
```

### `remove` [top](#methods)

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

***

```javascript
b.remove();
```
```html
<div class="parent">
</div>
```

### `replaceWith` [top](#methods)

Will replace a selected `Node` with the first argument in `replaceWith`.

```javascript
var parent = el('div', { class : 'parent' });
var replaceMe = el('div', { class : 'replace-me' });
var withMe = el('div', { class : 'with-me' });

parent.append(replaceMe);
```
```html
<div class="parent">
  <div class="replace-me"></div>
</div>
```

***

```javascript
replaceMe.replaceWith(withMe);
```
```html
<div class="parent">
  <div class="with-me"></div>
</div>
```

### `select` [top](#methods)

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

### `value` [top](#methods)

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

## Events
###Off ... ([top](#table-of-contents))

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

###On ... ([top](#table-of-contents))

This is an interface for `addEventListener`, with the main difference being how functions are tracked internally.

```javascript
var element = el('div');

element.on('click', function () {
  console.log('click');
});

div.appendTo('body');
```
Now when you click on the element, it will log `click` to the console.

## Predicates
###Predicates ... ([top](#table-of-contents))

### `contains` [top](#methods)

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

### `hasParent` [top](#methods)

```javascript
var myParent = el('div',
  var myChild = el('div')
);

myChild.hasParent(myParent);
// -> true
```

### `isFocused` [top](#methods)

```javascript
var myFocus = el('label', { tabIndex : 0 });

myFocus.isFocused();
// -> false

myFocus.focus();

myFocus.isFocused();
// -> true
```

### `isVisible` [top](#methods)

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

## Query
###Closest ... ([top](#table-of-contents))

Returns the closest parent matching the query.

```javascript
var farthest;
var parent = el('div', { class : 'closest' },
  farthest = el('div', { class : 'farthest' })
);

farthest.closest('.closest');

// -> HTML Element : div.closest
```

###Find ... ([top](#table-of-contents))

Returns an array of matches as a result of executing the query.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find' }),
  el('div', { class : 'find' })
);

parent.find('.find');
// -> HTML NodeList : [ div.find, div.find ]
```

###Firstchild ... ([top](#table-of-contents))

Returns the first child of NodeType 1 of a parent.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find-1' }),
  el('div', { class : 'find-2' })
);

parent.firstChild();
// -> HTML NodeList : div.find-1
```

###Getselector ... ([top](#table-of-contents))

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

###Lastchild ... ([top](#table-of-contents))

Returns the first child of NodeType 1 of a parent.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find-1' }),
  el('div', { class : 'find-2' })
);

parent.lastChild();
// -> HTML NodeList : div.find-2
```

###Offset ... ([top](#table-of-contents))

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

###Parent ... ([top](#table-of-contents))

If the `node` has a parent, it will return it's parent. Otherwise, it will return `false`

```javascript
var child = el('div');

child.parent();
// -> false

child.appendTo(document.body);
child.parent();
// -> HTML Element : document.body
```

###Parents ... ([top](#table-of-contents))

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

###Parentsuntil ... ([top](#table-of-contents))

Takes a predicate as an argument and returns the first `truthy` match.

```javascript
div.parentsUntil(function (p) { return p.tagName === 'h1' });
```

###Selectorpath ... ([top](#table-of-contents))

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

###Siblings ... ([top](#table-of-contents))

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

###Styles ... ([top](#table-of-contents))

Is an interface for `window.getComputedStyle([node])`, returns an object.

```javascript
div.styles();
// -> [ Object ]
```

###Textnodes ... ([top](#table-of-contents))

Returns all the `Text Nodes` which are a child of a selected node.

```javascript
var selected = el('div', { class : 'parent-1' }, 'text node');
selected.textNodes();
// -> [Text Node]
```
