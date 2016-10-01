Is an interface for `appendChild`, the result being a way to add a child `Node` to a parent `Node`.

When a `Node` is appended to an element in the `DOM` it emmits a `mount` event.

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
