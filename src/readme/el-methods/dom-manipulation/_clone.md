Clones an element, is an interface for `Node.cloneNode(true)`

```javascript
var a = el('div', [
  el('div', { className : 'child-1' }),
  el('div', { className : 'child-2' }),
  el('div', { className : 'child-3' })
]);

var b = a.clone();
```

```html
<!-- b -->
<div>
  <div class="child-1"></div>
  <div class="child-2"></div>
  <div class="child-3"></div>
</div>
```
