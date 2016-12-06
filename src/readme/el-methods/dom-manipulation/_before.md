Is an interface for `insertBefore`, the result being a way to add a `Node` before the reference `Node`.

When a `Node` is appended to an element in the `DOM` it emmits a `mount` event.

```javascript
var parent = el('div', { className : 'parent-1' });
var reference = el('div', { className : 'reference-1' });
var before = el('div', { className : 'before-1' });

parent.append([ref]);
reference.before([before]);
```

```HTML
<div class="parent-1">
  <div class="before-1"></div>
  <div class="reference-1"></div>
</div>
```
