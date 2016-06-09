# Create Node
#### Now you to can create nodes with a simple interface which will be very familiar.

### Basic usage
```
createNode('div', { class : 'my-class-name' }, 'some text');
```

### Methods

#### Attributes
- [`addClass`](#addclass)
- [`attr`](#attr)
- [`copyAttributes`](#copyattributes)
- [`removeClass`](#removeclass)
- `style`
- `toggleClass`

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
createNode('div').addClass('this-class-name');
```

### `attr`

```javascript
createNode('div').attr('data-attribute', 'value');
```

```javascript
createNode('div').attr({
  class : 'some-class-name',
  style : 'background: red'
});
```

### `copyAttributes`

`createNode([String], [Object], [String]).copyAttributes([CreateNode Object | Selector | HTML Element])`

```javascript
var node = document.querySelector('#copy-these-attributes');
createNode('div').copyAttributes(node);
```

### `removeClass`

`createNode([String], [Object], [String]).removeClass([String])`

```javascript
createNode('div').removeClass('class-name');
```
