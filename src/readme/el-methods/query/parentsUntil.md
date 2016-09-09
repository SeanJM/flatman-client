Takes a predicate as an argument and returns the first `truthy` match.

```javascript
div.parentsUntil(function (p) { return p.tagName === 'h1' });
```
