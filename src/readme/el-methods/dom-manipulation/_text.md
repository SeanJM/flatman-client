Sets the text value of a node, uses `textContent` as opposed to `innerHTML`, this distinction is important since any HTML passed as a string will be converted to text.

```javascript
var target = el(document.querySelector('.target-node'));
target.text('my text');
```

Passing it no arguments will return the value of `textContent`

```javascript
var target = el(document.querySelector('.target-node'));
target.text();
// -> 'my text'
```
