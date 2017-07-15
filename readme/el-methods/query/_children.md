Returns an array of direct descendants wrapped in the `el` constructor. This is an interface for `childNodes` with a filter for a `NodeType` equal to `1` (`HTMlElement`)

```javascript
var a = el('div', [
  el('div', { className : 'child-1' }),
  el('div', { className : 'child-2' }),
  el('div', { className : 'child-3' })
]);

a.childNodes;
```

```html
<div class="child-1"></div>
<div class="child-2"></div>
<div class="child-3"></div>
```

You can also specify an index

```javascript
a.children(0);
// -> <div class="child-1"></div>
```

You can also use negative numbers

```javascript
a.children(-1);
// -> <div class="child-3"></div>
```

You can also `slice` the child array

```javascript
a.children(1, -1);
// -> <div class="child-2"></div>
// -> <div class="child-3"></div>
```
