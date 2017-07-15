Will remove the class name from a node.

```html
<div id="copy" class="my-class-name" data-attribute="some-text">
```

```javascript
var node = el(document.querySelector('#copy'));
node.removeClass('my-class-name');
```

```html
<div id="copy" data-attribute="some-text">
```
