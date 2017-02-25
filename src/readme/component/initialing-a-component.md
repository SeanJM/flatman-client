The most basic way to initialize a component is like this:

```javascript
el('Component')
```

It takes the same type of arguments that a regular `el` takes.

A component and an element are designed to be similar. This means you can do things like this:

```javascript
el('Component', [
  el('div'),
  el(Component)
]);
```
