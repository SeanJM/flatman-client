Returns a `String` selector for the selected node.

```javascript
var parent = el('div', {
  class : 'closest',
  tabIndex : 0,
  id : 'my-id'
});

parent.getSelector();
// -> HTML NodeList : div.closest#my-id[tabindex="0"]
```
