# Create Node
Now you to can create nodes with a simple interface which will be very familiar.

Thanks to Freezer for some help for clearing up the "child" problem https://freezer.js.org/minimum-viable-view-library/

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

### Methods

#### [Attributes](#attributes-^)
- [`addClass`](#addclass-^)
- [`attr`](#attr-^)
- [`copyAttributes`](#copyattributes-^)
- [`removeClass`](#removeclass-^)
- [`style`](#style-^)
- [`toggleClass`](#toggleclass-^)

#### [Boolean](#boolean-^)
- [`contains`](#contains-^)
- [`hasClass`](#hasclass-^)
- [`hasParent`](#hasparent-^)
- [`isChecked`](#ischecked-^)
- [`isFocused`](#isfocused-^)
- [`isVisible`](#isvisible-^)

#### Query
- `closest`
- `find`
- `firstChild`
- `getSelector`
- `lastChild`
- `nodeText`
- `offset`
- `parent`
- `parents`
- `selectorPath`
- `siblings`
- `textNodes`

#### DOM Manipulation
- `append`
- `appendTo`
- `before`
- `centerTo`
- `check`
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

#### `addClass` [^](#methods)

```javascript
el('div').addClass('this-class-name');
```

## Attributes [^](#methods)

#### `attr` [^](#methods)

```javascript
el('div').attr('data-attribute', 'value');
```

```javascript
el('div').attr({
  class : 'some-class-name',
  style : 'background: red'
});
```


#### `copyAttributes` [^](#methods)

`el([String], [Object], [String]).copyAttributes([CreateNode Object | Selector | HTML Element])`

```javascript
var node = document.querySelector('#copy-these-attributes');
el('div').copyAttributes(node);
```


#### `removeClass` [^](#methods)

`el([String], [Object], [Child Object]).removeClass([String])`

```javascript
el('div').removeClass('class-name');
```


#### `style` [^](#methods)

`el([String], [Object], [Child Object]).style([Property], [Value])`

`el([String], [Object], [Child Object]).style([Object])`

```javascript
el('div').style('paddingLeft', 10);
```

```javascript
el('div').style({ paddingLeft : 10, marginTop : 10 });
```


#### `toggleClass` [^](#methods)

```javascript
var myDIV = el('div');

myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```


## Booleans [^](#methods)

#### `contains` [^](#methods)

```javascript
var myParent = el('div',
  var myChild = el('div')
);

myParent.contains(myChild);
// -> true
```

#### `hasClass` [^](#methods)

```javascript
var myDiv = el('div', { class : 'class-name' });

myParent.hasClass('class-name');
// -> true
```

#### `hasParent` [^](#methods)

```javascript
var myParent = el('div',
  var myChild = el('div')
);

myChild.hasParent(myParent);
// -> true
```

#### `isChecked` [^](#methods)

```javascript
var myParent = el('label',
  var myCheckbox = el('input', { type : 'checkbox' })
);

myCheckbox.isChecked(myParent);
// -> false

myCheckbox.check();

myCheckbox.isChecked(myParent);
// -> true
```

#### `isFocused` [^](#methods)

```javascript
var myFocus = el('label', { tabIndex : 0 });

myFocus.isFocused();
// -> false

myFocus.focus();

myFocus.isFocused();
// -> true
```

#### `isVisible` [^](#methods)

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

myFocus.isVisible(); [^](#methods)
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
