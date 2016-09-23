An interface to edit the style of a node, it can be used in 2 different ways.

- `el.style([ String property ], [ String|Number value])`
- `el.style([ Object property and values ])`

The property must be the JavaScript named property. Vendor prefixes are not necessary.

### Value and property

```javascript
var a = el();

a.style('fontSize', 13);
```

### Object

```javascript
var a = el();

a.style({
  fontSize : 13,
  fontWeight : 'bold'
});
```