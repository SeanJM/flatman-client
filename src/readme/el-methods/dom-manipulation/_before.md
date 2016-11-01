Is an interface for `insertBefore`, the result being a way to add a `Node` before the reference `Node`.

When a `Node` is appended to an element in the `DOM` it emmits a `mount` event.

```javascript
var parent = el({ class : 'parent-1' });
var reference = el({ class : 'reference-1' });
var before = el({ class : 'before-1' });

parent.append(ref);
reference.before(before);
```

```HTML
<div class="parent-1">
  <div class="before-1"></div>
  <div class="reference-1"></div>
</div>
```

You can also pass as many valid elements as you want to `before`

```javascript
var parent = el({ class : 'parent-1' });
var reference = el({ class : 'reference-1' });
var before1 = el({ class : 'before-1' });
var before2 = el({ class : 'before-2' });

parent.append(ref);
reference.before(before1, before2);
```

```HTML
<div class="parent-1">
  <div class="before-1"></div>
  <div class="before-2"></div>
  <div class="reference-1"></div>
</div>
```
