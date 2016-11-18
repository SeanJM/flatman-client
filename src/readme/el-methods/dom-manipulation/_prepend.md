Will append a child element in the first position of the parent node.

```javascript
var parent = el('div', { class : 'parent' }, [
  el('div', { 'first-child' })
]);

var child = el('div', { class : 'second-child' });
```

```html
<div class="parent">
  <div class="first-child"></div>
</div>
```

```javascript
parent.prepend(child);
```

```html
<div class="parent">
  <div class="second-child"></div>
  <div class="first-child"></div>
</div>
```
