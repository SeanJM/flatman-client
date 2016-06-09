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
- `copyAttributes`
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

```
createNode('div').addClass('this-class-name');
```

### `attr`

```
createNode('div').attr('data-attribute', 'value');
```

```
createNode('div').attr({
  class : 'some-class-name',
  style : 'background: red'
});
```
