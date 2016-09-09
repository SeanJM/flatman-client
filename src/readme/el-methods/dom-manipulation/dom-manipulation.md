### `prependTo` [top](#methods)

Will append a child element in the first position of the parent node.

```javascript
var child = el('div', { class : 'second-child' });
var parent = el('div', { class : 'parent' },
  el('div', { 'first-child' })
);
```
```html
<div class="parent">
  <div class="first-child"></div>
</div>
```
***

```javascript
child.prependTo(parent);
```
```html
<div class="parent">
  <div class="second-child"></div>
  <div class="first-child"></div>
</div>
```

### `remove` [top](#methods)

Will remove a `Node` from it's parent.

```javascript
var a = el('div', { class : 'parent' });
var b = el('div', { class : 'first-child' });

a.append(b);
```
```html
<div class="parent">
  <div class="first-child"></div>
</div>
```

***

```javascript
b.remove();
```
```html
<div class="parent">
</div>
```

### `replaceWith` [top](#methods)

Will replace a selected `Node` with the first argument in `replaceWith`.

```javascript
var parent = el('div', { class : 'parent' });
var replaceMe = el('div', { class : 'replace-me' });
var withMe = el('div', { class : 'with-me' });

parent.append(replaceMe);
```
```html
<div class="parent">
  <div class="replace-me"></div>
</div>
```

***

```javascript
replaceMe.replaceWith(withMe);
```
```html
<div class="parent">
  <div class="with-me"></div>
</div>
```

### `select` [top](#methods)

Proves an interface to select text ranges and get the selected text range in an input.

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

### `value` [top](#methods)

Query
```javascript
var a = el(document.querySelector('.my-input'));
a.value();
// -> 'My text'
```

Set
```javascript
var a = el(document.querySelector('.my-input'));
a.value('New text');
```
