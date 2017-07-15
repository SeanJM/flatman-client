Sets the `innerHTML` value of a node.

```javascript
var target = el(document.querySelector('.target-node'));
target.html('<div class="my-div"></div>');
```

Passing it no arguments will return the value of `innerHTML`

```javascript
var target = el(document.querySelector('.target-node'));
target.html();
// -> '<div class="my-div"></div>'
```
