Will append a child element in the first position of the parent node.

```javascript
var child = el('div', { className : 'second-child' });
var parent = el('div', { className : 'parent' }, [
  el('div', { 'first-child' })
]);
```

```html
<div class="parent">
  <div class="first-child"></div>
</div>
```

```javascript
child.prependTo(parent);
```

```html
<div class="parent">
  <div class="second-child"></div>
  <div class="first-child"></div>
</div>
```
