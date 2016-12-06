Returns the closest parent matching the query.

```javascript
var farthest;
var parent = el('div', { className : 'closest' }, [
  farthest = el('div', { className : 'farthest' })
]);

farthest.closest('.closest');

// -> HTML Element : div.closest
```
