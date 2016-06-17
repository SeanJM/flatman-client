
# Create Node

- Unit tests cover 100% of the code
- Create nodes with a simple interface which will be very familiar.
- Get an API to simplify DOM manipulation
- Plugin architecture to extend the prototype

Thanks to [FRZR](https://frzr.js.org/) for some help for clearing up the "child" problem https://freezer.js.org/minimum-viable-view-library/

### Basic usage
```javascript
el('div', { class : 'my-class-name' }, 'some text');
```

### Nesting
```javascript
el('div',
  el('div', { class : 'child'}),
  el('div', { class : 'child-2'})
);
```

### Wrapping a DOM node and getting the interface

You can get all the methods and the simplified interface based on ideas in jQuery by wrapping a node in `el`.

```javascript
var wrapped = el(document.querySelector('#my-div'));
```

### Methods

#### [Attributes](#attributes-top)
- [`addClass`](#addclass-top)
- [`attr`](#attr-top)
- [`copyAttributes`](#copyattributes-top)
- [`removeClass`](#removeclass-top)
- [`style`](#style-top)
- [`toggleClass`](#toggleclass-top)

#### [Boolean](#boolean-top)
- [`contains`](#contains-top)
- [`hasClass`](#hasclass-top)
- [`hasParent`](#hasparent-top)
- [`isChecked`](#ischecked-top)
- [`isFocused`](#isfocused-top)
- [`isVisible`](#isvisible-top)

#### [Query](#query-top)
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

#### [DOM Manipulation](#dom-manipulation-top)
- [`append`](#append-top)
- [`appendTo`](#appendto-top)
- [`before`](#before-top)
- [`centerTo`](#centerto-top)
- [`check`](#check-top)
- `children`
- `clone`
- `disable`
- `enable`
- `focus`
- `prepend`
- `prependTo`
- `remove`
- `replaceWith`
- `scale`
- `select`
- `tag`
- `text`
- `uncheck`
- `value`

### Event methods
- `on`
- `off`
- `trigger`

## Details

#### `addClass` [top](#methods)

```javascript
el('div').addClass('this-class-name');
```

## Attributes [top](#methods)

#### `attr` [top](#methods)

```javascript
el('div').attr('data-attribute', 'value');
```

```javascript
el('div').attr({
  class : 'some-class-name',
  style : 'background: red'
});
```


#### `copyAttributes` [top](#methods)

Copies the attributes from the node passed.

```javascript
var node = document.querySelector('#copy');
// #copy : .my-class-name[id="copy"][data-attribute="some-text"]

el('div').copyAttributes(node);
// div : .my-class-name[id="copy"][data-attribute="some-text"]
```


#### `removeClass` [top](#methods)

`el([String], [Object], [Child Object]).removeClass([String])`

```javascript
el('div').removeClass('class-name');
```


#### `style` [top](#methods)

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

#### `toggleClass` [top](#methods)

```javascript
var myDIV = el('div');

myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```


## Booleans [top](#methods)

#### `contains` [top](#methods)

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

#### `hasClass` [top](#methods)

```javascript
var myDiv = el('div', { class : 'class-name' });

myParent.hasClass('class-name');
// -> true
```

#### `hasParent` [top](#methods)

```javascript
var myParent = el('div',
  var myChild = el('div')
);

myChild.hasParent(myParent);
// -> true
```

#### `isChecked` [top](#methods)

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

#### `isFocused` [top](#methods)

```javascript
var myFocus = el('label', { tabIndex : 0 });

myFocus.isFocused();
// -> false

myFocus.focus();

myFocus.isFocused();
// -> true
```

#### `isVisible` [top](#methods)

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

#### `closest` [top](#methods)

Returns the closest parent matching the query.

```javascript
var farthest;
var parent = el('div', { class : 'closest' },
  farthest = el('div', { class : 'farthest' })
);

farthest.closest('.closest');

// -> HTML Element : div.closest
```

#### `find` [top](#methods)

Returns an array of matches as a result of executing the query.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find' }),
  el('div', { class : 'find' })
);

parent.find('.find');
// -> HTML NodeList : [ div.find, div.find ]
```

#### `firstChild` [top](#methods)

Returns the first child of NodeType 1 of a parent.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find-1' }),
  el('div', { class : 'find-2' })
);

parent.firstChild();
// -> HTML NodeList : div.find-1
```

#### `getSelector` [top](#methods)

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

#### `lastChild` [top](#methods)

Returns the first child of NodeType 1 of a parent.

```javascript
var parent = el('div', { class : 'closest' },
  el('div', { class : 'find-1' }),
  el('div', { class : 'find-2' })
);

parent.lastChild();
// -> HTML NodeList : div.find-2
```

#### `offset` [top](#methods)

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

#### `parent` [top](#methods)

If the `node` has a parent, it will return it's parent. Otherwise, it will return `false`

```javascript
var child = el('div');

child.parent();
// -> false

child.appendTo(document.body);
child.parent();
// -> HTML Element : document.body
```

#### `parents` [top](#methods)

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

#### `selectorPath` [top](#methods)

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

#### `siblings` [top](#methods)

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
// -> [div.siblings-1, div.siblings-2, div.siblings-3, div.siblings-4]
```

#### `textNodes` [top](#methods)

Returns all the `Text Nodes` which are a child of a selected node.

```javascript
var selected = el('div', { class : 'parent-1' }, 'text node');
selected.textNodes();
// -> [Text Node]
```

## Dom Manipulation [top](#methods)

#### `append` [top](#methods)

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

And

Result

```HTML
<div class="parent-1">
  <div class="child-1"></div>
</div>
```

#### `appendTo` [top](#methods)

Is an interface for `appendChild`, the result being a way to add a child `Node` to a parent `Node`.

```javascript
var parent = el('div', { class : 'parent-1' });
var child = el('div', { class : 'child-1' });
child.appendTo(parent);
```

Result

```HTML
<div class="parent-1">
  <div class="child-1"></div>
</div>
```

#### `before` [top](#methods)

Is an interface for `insertBefore`, the result being a way to append a `Node` before it's sibling `Node`.

```javascript
var parent = el('div', { class : 'parent-1' });
var sibling_1 = el('div', { class : 'sibling-1' });
var sibling_2 = el('div', { class : 'sibling-2' });
sibling_1.appendTo(parent);
sibling_2.before(sibling_1);
```

Result

```HTML
<div class="parent-1">
  <div class="sibling-2"></div>
  <div class="sibling-1"></div>
</div>
```

#### `centerTo` [top](#methods)

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

Result

```HTML
<div class="center-1" style="top: 75px; left: 75px;"></div>
```

#### `check` [top](#methods)

Will check a checkbox or a radio

```javascript
var checkbox = el('input', { type : 'checkbox' });
checkbox.check().isChecked();
// -> true
```
