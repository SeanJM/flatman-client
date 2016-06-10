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

#### [Attributes](#attributes-1)
- [`addClass`](#addclass)
- [`attr`](#attr)
- [`copyAttributes`](#copyattributes)
- [`removeClass`](#removeclass)
- [`style`](#style)
- [`toggleClass`](#toggleclass)

#### [Boolean](#boolean-1)
- [`contains`](#contains)
- [`hasClass`](#hasclass)
- [`hasParent`](#hasparent)
- [`isChecked`](#ischecked)
- [`isFocused`](#isfocused)
- `isVisible`

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

#### `addClass`

```javascript
el('div').addClass('this-class-name');
```

## Attributes

#### `attr`

```javascript
el('div').attr('data-attribute', 'value');
```

```javascript
el('div').attr({
  class : 'some-class-name',
  style : 'background: red'
});
```


#### `copyAttributes`

`el([String], [Object], [String]).copyAttributes([CreateNode Object | Selector | HTML Element])`

```javascript
var node = document.querySelector('#copy-these-attributes');
el('div').copyAttributes(node);
```


#### `removeClass`

`el([String], [Object], [Child Object]).removeClass([String])`

```javascript
el('div').removeClass('class-name');
```


#### `style`

`el([String], [Object], [Child Object]).style([Property], [Value])`

`el([String], [Object], [Child Object]).style([Object])`

```javascript
el('div').style('paddingLeft', 10);
```

```javascript
el('div').style({ paddingLeft : 10, marginTop : 10 });
```


#### `toggleClass`

```javascript
var myDIV = el('div');

myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'
myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```


## Booleans

#### `contains`

```javascript
var myParent = el('div',
  var myChild = el('div')
);

myParent.contains(myChild);
// -> true
```

#### `hasClass`

```javascript
var myDiv = el('div', { class : 'class-name' });

myParent.hasClass('class-name');
// -> true
```

#### `hasParent`

```javascript
var myParent = el('div',
  var myChild = el('div')
);

myChild.hasParent(myParent);
// -> true
```

#### `isChecked`

```javascript
var myParent = el('label',
  var myCheckbox = el('input', { type : 'checkbox' })
);

myCheckbox.check();

myCheckbox.isChecked(myParent);
// -> true
```

#### `isFocused`

```javascript
var myFocus = el('label', { tabIndex : 0 });

myFocus.isFocused();
// -> false

myFocus.focus();

myFocus.isFocused();
// -> true
```
