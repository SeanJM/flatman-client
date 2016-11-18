Replaces a target node with a new node.

```javascript
var targetNode = el(document.querySelector('.target-node'));
var newNode = el('div', { class : 'new-node' });
targetNode.replaceWith(newNode);
```
