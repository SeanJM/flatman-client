Will copy a target node's attributes from another node, including it's `innerHTML`.

```javascript
var a = el();
var b = el({ class : 'test' }, 'text');
a.copy(b);

a.className();
//-> test

a.html();
// -> text
```
