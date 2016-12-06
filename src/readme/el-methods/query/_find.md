Returns an array of matches as a result of executing the query.

```javascript
var parent = el('div', { className : 'closest' }, [
  el('div', { className : 'find' }),
  el('div', { className : 'find' })
]);

parent.find('.find');
// -> HTML NodeList : [ div.find, div.find ]
```
