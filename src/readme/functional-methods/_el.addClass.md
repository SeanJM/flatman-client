Is a curried function which can take `1` or `2` arguments.

Using `el.addClass` with a single argument will return a function which expects a `Node` or an `Array` of nodes.

Using the partially applied function:

```javascript
var pizzas = document.querySelectorAll('.pizza');
[].forEach.call(pizzas, el.addClass('class-name'));
```

Using the function with `2` arguments:

```javascript
var pizza = document.querySelector('.pizza');
el.addClass('class-name', pizza);
```
