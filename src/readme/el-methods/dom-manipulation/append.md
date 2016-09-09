Is an interface for `appendChild`, the result being a way to add a `Node` to a parent `Node`.

```javascript
var parent = el('div', { class : 'parent-1' });
var child = el('div', { class : 'child-1' });
parent.append(child);
```

is the same as

```javascript
var parent = el('div', { class : 'parent-1' }, el('div', { class : 'child-1' }));
```

```javascript
el('div', { class : 'parent-1' }).append(el('div', { class : 'child-1' }));
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
</div>
```

You can also pass as many valid elements as you want to `append`

```javascript
var parent = el('div', { class : 'parent-1' });
var child1 = el('div', { class : 'child-1' });
var child2 = el('div', { class : 'child-2' });

parent.append(child1, child2);
```

```HTML
<div class="parent-1">
  <div class="child-1"></div>
  <div class="child-2"></div>
</div>
```
