# Create Node
#### Now you to can create nodes with a simple interface which will be very familiar.

### Basic usage
```javascript
createNode('div', { class : 'my-class-name' }, 'some text');
```
### Nesting

Possible `Child Object`

- Array of Arguments `['div', {}, Child Object]`
- `Text`
- `CreateNode Object`
- `HTML Element`

```javascript
createNode('div', { class : 'my-class-name' }, [Child Object]);
```

### HTML Like Syntax
```javascript
createNode(
  ['div', { class : 'parent' },
    ['div', { class : 'parent_child-1'}],
    ['div', { class : 'parent_child-2'}],
    ['div', { class : 'parent_child-3'},
      ['div', { class : 'parent_child-3_child-1' }]
    ],
  ]
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
createNode('div').addClass('this-class-name');
```

---------------------------------------

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

---------------------------------------

### `copyAttributes`

`createNode([String], [Object], [String]).copyAttributes([CreateNode Object | Selector | HTML Element])`

```javascript
var node = document.querySelector('#copy-these-attributes');
createNode('div').copyAttributes(node);
```

---------------------------------------

### `removeClass`

`createNode([String], [Object], [Child Object]).removeClass([String])`

```javascript
createNode('div').removeClass('class-name');
```

---------------------------------------

### `style`

`createNode([String], [Object], [Child Object]).style([Property], [Value])`

`createNode([String], [Object], [Child Object]).style([Object])`

```javascript
createNode('div').style('paddingLeft', 10);
```

```javascript
createNode('div').style({ paddingLeft : 10, marginTop : 10 });
```

---------------------------------------

### `toggleClass`

`createNode([String], [Object], [Child Object]).toggleClass([String])`

```javascript
var myDIV = createNode('div');

myDIV.toggleClass('toggle'); // -> myDIV has class 'toggle'

myDIV.toggleClass('toggle'); // -> myDIV does not have class 'toggle'
```
