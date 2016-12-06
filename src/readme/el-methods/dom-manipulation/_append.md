Is an interface for `appendChild`, the result being a way to add a `Node` to a parent `Node`.

When a `Node` is appended to an element in the `DOM` it emits a `mount` event.

```javascript
var parent = el('div', { className : 'parent-1' });
var child = el('div', { className : 'child-1' });
parent.append([child]);
```

is the same as

```javascript
var parent = el('div', { className : 'parent-1' }, [
  el('div', { className : 'child-1' })
]);
```

```javascript
el('div', { className : 'parent-1' }).append([
  el('div', { className : 'child-1' })
]);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
  <div class="child-2"></div>
</div>
```
