Provides an interface to select text ranges and select the `option` node.

Query
```javascript
var a = el(document.querySelector('.my-input'));
a.select();
// -> [0, 2]
```

Set
```javascript
var a = el(document.querySelector('.my-input'));
a.select(0, 2);
```

By entering a single value, the cursor will be placed without selecting.
- Negative values start from the end.

```javascript
a.select(-1);
```

This example selects from the first letter to 3 letters from the end.

```javascript
a.select(0, -3);
```

`select`

```javascript
var a = el('select', [
  el('option'),
  el('option')
]);

a.select(0);

// -> will select the first option node
```
