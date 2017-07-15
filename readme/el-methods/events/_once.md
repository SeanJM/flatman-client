Will add an event listener which will execute once, then remove the listener.

```javascript
var element = el('div');

element.once('click', function () {
  console.log('click');
});

div.appendTo(document.body);
```
Now when you click on the element, it will log `click` to the console. Any additional clicks will not trigger the event.
