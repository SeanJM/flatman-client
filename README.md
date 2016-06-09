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
- `removeClass`
- `src`
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

`createNode([string], [object], [string]).copyAttributes([CreateNode Object | selector | HTML Element])`

```javascript
createNode('div').copyAttributes(document.querySelector('#copy-these-attributes'));
```
