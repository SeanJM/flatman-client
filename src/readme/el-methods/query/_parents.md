Returns an array of parents, from first to last.

```javascript
var child;

el('div', { class : 'parent-1' }, [
  el('div', { class : 'parent-2' }, [
    child = el('div', { class : 'parent-3 '})
  ])
]);

child.parents();
// -> [Array]
```
