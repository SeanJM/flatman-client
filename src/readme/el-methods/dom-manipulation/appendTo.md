Is an interface for `appendChild`, the result being a way to add a child `Node` to a parent `Node`.

```javascript
var parent = el('div', { class : 'parent-1' });
var child = el('div', { class : 'child-1' });
child.appendTo(parent);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
</div>
```

### `before` [top](#methods)

Is an interface for `insertBefore`, the result being a way to append a `Node` before it's sibling `Node`.

```javascript
var parent = el('div', { class : 'parent-1' });
var sibling_1 = el('div', { class : 'sibling-1' });
var sibling_2 = el('div', { class : 'sibling-2' });
sibling_1.appendTo(parent);
sibling_2.before(sibling_1);
```

```HTML
<div class="parent-1">
  <div class="sibling-2"></div>
  <div class="sibling-1"></div>
</div>
```
