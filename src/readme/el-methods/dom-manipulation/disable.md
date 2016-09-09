Disables an element by setting it's `disabled` attribute to `disabled`

```javascript
var a = el('div').disable();
```

Result

```html
<div disabled="disabled"></div>
```

### `enable` [top](#methods)

Enables an element by removing it's `disabled` attribute

```html
<div id="disabled" disabled="disabled"></div>
```

```javascript
var a = el(document.getElementById('disabled')).enable();
```

***

```html
<div id="disabled"></div>
```
