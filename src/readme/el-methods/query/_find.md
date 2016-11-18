Returns an array of matches as a result of executing the query.

```javascript
var parent = el('div', { class : 'closest' }, [
  el('div', { class : 'find' }),
  el('div', { class : 'find' })
]);

parent.find('.find');
// -> HTML NodeList : [ div.find, div.find ]
```
