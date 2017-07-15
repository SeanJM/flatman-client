Will remove a child `Node`.

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
a.removeChild(b);
```

```html
<div class="parent">
</div>
```
