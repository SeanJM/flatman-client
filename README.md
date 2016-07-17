
# Create Node

- Unit tests cover 100% of the code
- Create nodes with a simple interface which will be very familiar.
- Get an API to simplify DOM manipulation
- Plugin architecture to extend the prototype

Thanks to [FRZR](https://frzr.js.org/) for some help for clearing up the "child" problem https://freezer.js.org/minimum-viable-view-library/

## Basic usage
```javascript
el('div', { class : 'my-class-name' }, 'some text');
```

## Nesting
```javascript
el('div',
  el('div', { class : 'child'}),
  el('div', { class : 'child-2'})
);
```

## Wrapping a DOM node and getting the interface

You can get all the methods and the simplified interface based on ideas in jQuery by wrapping a node in `el`.

```javascript
var wrapped = el(document.querySelector('#my-div'));
```

## Passing other object types as arguments

- You can pass it anything which has an `appendTo` method

## Passing a constructor object or Component

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
    componentMethod : [ Array ] // This will be applied to the method as a list of arguments
    componentMethod2 : argument // Will be passed as a single argument to your method
  }, 
  'text' // Will trigger the `text` method for the component
);
```

### I don't have mehtods for `...`

That's okay, if you are missing methods with the exception of
- `appendTo`
- `addClass` when the class key is present
- `on*` when a key matching that pattern is present

You will also get the options object passed to the constructor.

### A more detailed example

- The Component

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
    }
  },
  'My Text'
);
```

## `el` Methods

### [Attributes](#attributes-top)
- [`addClass`](#addclass-top)
- [`attr`](#attr-top)
- [`copyAttributes`](#copyattributes-top)
- [`removeClass`](#removeclass-top)
- [`style`](#style-top)
- [`toggleClass`](#toggleclass-top)

### [Boolean](#boolean-top)
- [`contains`](#contains-top)
- [`hasClass`](#hasclass-top)
- [`hasParent`](#hasparent-top)
- [`isChecked`](#ischecked-top)
- [`isFocused`](#isfocused-top)
- [`isVisible`](#isvisible-top)

### [Query](#query-top)
- [`closest`](#closest-top)
- [`find`](#find-top)
- [`firstChild`](#firstchild-top)
- [`getSelector`](#getselector-top)
- [`lastChild`](#lastchild-top)
- [`offset`](#offset-top)
- [`parent`](#parent-top)
- [`parents`](#parents-top)
- [`selectorPath`](#selectorpath-top)
- [`siblings`](#siblings-top)
- [`textNodes`](#textnodes-top)

### [DOM Manipulation](#dom-manipulation-top)
- [`append`](#append-top)
- [`appendTo`](#appendto-top)
- [`before`](#before-top)
- [`centerTo`](#centerto-top)
- [`check`](#check-top)
- [`children`](#children-top)
- [`clone`](#clone-top)
- [`disable`](#disable-top)
- [`enable`](#enable-top)
- [`focus`](#enable-top)
- [`prepend`](#prepend-top)
- [`prependTo`](#prependto-top)
- [`remove`](#remove-top)
- [`replaceWith`](#replacewith-top)
- [`select`](#select-top)
- [`tag`](#tag-top)
- [`text`](#text-top)
- [`uncheck`](#uncheck-top)
- [`value`](#value-top)

## Event methods
- [`on`](#on-top)
- [`off`](#off-top)
- `trigger`

## Functional interfaces
- `el.contains`
- `el.isVisible`
- `el.fn`
- `el.hasParent`

## Details

### `addClass` [top](#methods)

```javascript
el('div').addClass('this-class-name');
```

## Attributes [top](#methods)

### `attr` [top](#methods)

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

### `copyAttributes` [top](#methods)

Copies the attributes from the node passed.

```html
<div id="copy" class="my-class-name" data-attribute="some-text">
```

```javascript
var node = document.querySelector('#copy');
var span = el('span');
span.copyAttributes(node);
```
***

```html
<span id="copy" class="my-class-name" data-attribute="some-text">
```

### `removeClass` [top](#methods)

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

### `style` [top](#methods)

```javascript
el('div').style('padding-left', 10);
el('div').style('padding-left: 10px');

// Using an Object
el('div').style({
  paddingLeft : 10,
  marginTop : 10
});

// Performing a query will return an Object
el('div').style();
```

### `toggleClass` [top](#methods)

```javascript
var myDIV = el('div');

myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```


## Booleans [top](#methods)

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

### `hasClass` [top](#methods)

```javascript
var myDiv = el('div', { class : 'class-name' });

myParent.hasClass('class-name');
// -> true
```

### `hasParent` [top](#methods)

```javascript
var myParent = el('div',
  var myChild = el('div')
);

myChild.hasParent(myParent);
// -> true
```

### `isChecked` [top](#methods)

```javascript
var myCheckbox;
var myParent = el('label',
  myCheckbox = el('input', { type : 'checkbox' })
);

myCheckbox.isChecked(myParent);
// -> false

myCheckbox.check();

myCheckbox.isChecked(myParent);
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

## Query [top](#methods)

### `closest` [top](#methods)

Returns the closest parent matching the query.

```javascript
var farthest;
var parent = el('div', { class : 'closest' },
  farthest = el('div', { class : 'farthest' })
);

farthest.closest('.closest');

// -> HTML Element : div.closest
```

### `find` [top](#methods)

Returns an array of matches as a result of executing the query.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find' }),
  el('div', { class : 'find' })
);

parent.find('.find');
// -> HTML NodeList : [ div.find, div.find ]
```

### `firstChild` [top](#methods)

Returns the first child of NodeType 1 of a parent.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find-1' }),
  el('div', { class : 'find-2' })
);

parent.firstChild();
// -> HTML NodeList : div.find-1
```

### `getSelector` [top](#methods)

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

### `lastChild` [top](#methods)

Returns the first child of NodeType 1 of a parent.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find-1' }),
  el('div', { class : 'find-2' })
);

parent.lastChild();
// -> HTML NodeList : div.find-2
```

### `offset` [top](#methods)

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

### `parent` [top](#methods)

If the `node` has a parent, it will return it's parent. Otherwise, it will return `false`

```javascript
var child = el('div');

child.parent();
// -> false

child.appendTo(document.body);
child.parent();
// -> HTML Element : document.body
```

### `parents` [top](#methods)

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

### `selectorPath` [top](#methods)

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

### `siblings` [top](#methods)

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

### `textNodes` [top](#methods)

Returns all the `Text Nodes` which are a child of a selected node.

```javascript
var selected = el('div', { class : 'parent-1' }, 'text node');
selected.textNodes();
// -> [Text Node]
```

## Dom Manipulation [top](#methods)

### `append` [top](#methods)

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

### `appendTo` [top](#methods)

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

### `centerTo` [top](#methods)

Is an interface centering a `Node` vertically and horizontally relative to another `Node`.

```javascript
var parent = el('div', {
  class : 'parent-1',
  style : {
    width : 200,
    height : 200,
  }
});

var centerMe = el('div', {
  class : 'center-1',
  style : {
    width : 50,
    height : 50,
    position : 'absolute'
  }
});

// This is important for the elements to be in the DOM to calculate their position
parent.appendTo('body');
centerMe.appendTo('body');
centerMe.centerTo(parent);

```

```HTML
<div class="center-1" style="top: 75px; left: 75px;"></div>
```

### `check` [top](#methods)

Will check a checkbox or a radio

```javascript
var checkbox = el('input', { type : 'checkbox' });
checkbox.check().isChecked();
// -> true
```

### `children` [top](#methods)

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

### `clone` [top](#methods)

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

### `disable` [top](#methods)

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

### `focus` [top](#methods)

Will `focus` an element. This will only work if the element is in the `document.body` and if it has an `tabindex` attribute.

```javascript
var a = el('div');
a.appendTo('body').focus();
```

### `prepend` [top](#methods)

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

### `tag` [top](#methods)

Change the `tagName` of an element. When passed with no arguments, it returns the value of `tagName`.

```javascript
var div = el('div');

div.tag('input');
div.tag();
// -> 'input'
```

### `text` [top](#methods)

Insert text into a node, will replace all the existing content with the text. When passed with no arguments, will return the text inside the node.

```javascript
var div = el('div');

div.text('text');
div.text();
// -> 'text'
```

### `uncheck` [top](#methods)

Uncheck a `radio` or `checkbox`

```javascript
var checkbox = el('input', { type : 'checkbox' });
checkbox.check();
```
```html
<input type="checkbox" checked="checked">
```
***

```javascript
checkbox.uncheck();
```
```html
<input type="checkbox">
```
### `value` [top](#methods)

This method is for setting the value of any text field and select element.
When passed no arguments, the method will return it's current value.

```javascript
var input = el('input', { type : 'text' });

input.value('text');
input.value();
// -> 'text'
```

### `on` [top](#methods)

This is an interface for `addEventListener`, with the main difference being how functions are tracked internally.

```javascript
var element = el('div');

element.on('click', function () {
  console.log('click');
});

div.appendTo('body');
```
Now when you click on the element, it will log `click` to the console.

### `off` [top](#methods)

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
