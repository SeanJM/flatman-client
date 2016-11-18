Returns the closest parent matching the query.

```javascript
var farthest;
var parent = el('div', { class : 'closest' }, [
  farthest = el('div', { class : 'farthest' })
]);

farthest.closest('.closest');

// -> HTML Element : div.closest
```
