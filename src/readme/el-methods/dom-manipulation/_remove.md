Will remove a `Node` from it's parent.

```javascript
var a = el('div', { className : 'parent' });
var b = el('div', { className : 'first-child' });

a.append(b);
```

```html
<div class="parent">
  <div class="first-child"></div>
</div>
```

```javascript
b.remove();
```

```html
<div class="parent">
</div>
```
