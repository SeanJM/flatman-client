Returns a selector path to the selected node.

```javascript
var child;

el('div', { className : 'parent-1' }, [
  el('div', { className : 'parent-2' }, [
    child = el('div', { className : 'parent-3 '})
  ])
]);

child.selectorPath();
// -> div.parent-3 div.parent-2 div.parent-1
```

If any of the parents has an ID, the path algorithm will terminate.

```javascript
var child;

el('div', { className : 'parent-1' }, [
  el('div', { id : 'super-parent', className : 'parent-2' }, [
    child = el('div', { className : 'parent-3 '})
  ])
]);

child.selectorPath();
// -> div.parent-2#super-parent div.parent-1
```
