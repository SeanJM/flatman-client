Returns a selected Node and it's siblings filtered to show only nodes of type `1`, which are HTML element nodes, this excludes text nodes.

```javascript
var selected;

el('div', { class : 'parent-1' },
  selected = el('div', { class : 'sibling-1' }),
  el('div', { class : 'sibling-2' }),
  el('div', { class : 'sibling-3' }),
  el('div', { class : 'sibling-4' })
);

selected.siblings();
```

```html
<div class="siblings-1"></div>
<div class="siblings-2"></div>
<div class="siblings-3"></div>
<div class="siblings-4"></div>
```
