This will trigger all listeners for matching event name.

```javascript
var node = el();

el.on('click', function myClickHandler() {
  // Do something
});

el.on('click', function myClickSecondHandler() {
  // Do something
});

el.trigger('click');
// -> will execute 'myClickHandler' and 'myClickSecondHandler'
```
