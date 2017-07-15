Uncheck a checkbox and radio

```javascript
var a = el('input', { type : 'checkbox' });

a.check();
a.isChecked();
// -> true

a.uncheck();
a.isChecked();
// -> false
```
