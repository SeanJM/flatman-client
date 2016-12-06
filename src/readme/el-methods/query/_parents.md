Returns an array of parents, from first to last.

```javascript
var child;

el('div', { className : 'parent-1' }, [
  el('div', { className : 'parent-2' }, [
    child = el('div', { className : 'parent-3 '})
  ])
]);

child.parents();
// -> [Array]
```
