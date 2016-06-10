# Create Node
#### Now you to can create nodes with a simple interface which will be very familiar.

#### Thanks to Freezer for some help https://freezer.js.org/minimum-viable-view-library/

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

#### Attributes
- [`addClass`](#addclass)
- [`attr`](#attr)
- [`copyAttributes`](#copyattributes)
- [`removeClass`](#removeclass)
- [`style`](#style)
- [`toggleClass`](#toggleclass)

#### Query
- `closest`
- `contains`
- `find`
- `firstChild`
- `getSelector`
- `hasClass`
- `hasParent`
- `isChecked`
- `isFocused`
- `isVisible`
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

### `addClass`

```javascript
el('div').addClass('this-class-name');
```

---------------------------------------

### `attr`

```javascript
el('div').attr('data-attribute', 'value');
```

```javascript
el('div').attr({
  class : 'some-class-name',
  style : 'background: red'
});
```

---------------------------------------

### `copyAttributes`

`el([String], [Object], [String]).copyAttributes([CreateNode Object | Selector | HTML Element])`

```javascript
var node = document.querySelector('#copy-these-attributes');
el('div').copyAttributes(node);
```

---------------------------------------

### `removeClass`

`el([String], [Object], [Child Object]).removeClass([String])`

```javascript
el('div').removeClass('class-name');
```

---------------------------------------

### `style`

`el([String], [Object], [Child Object]).style([Property], [Value])`

`el([String], [Object], [Child Object]).style([Object])`

```javascript
el('div').style('paddingLeft', 10);
```

```javascript
el('div').style({ paddingLeft : 10, marginTop : 10 });
```

---------------------------------------

### `toggleClass`

`el([String], [Object], [Child Object]).toggleClass([String])`

```javascript
var myDIV = el('div');

myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'

myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```
