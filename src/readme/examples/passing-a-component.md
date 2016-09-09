- `el` works with constructors, it is opinionated and will return errors if your constructor isn't capitalized.
- It takes the same type of arguments that a regular `el` takes.
- The constructor must have an `appendTo` method which will append it to another element.
- Any key which begins with `on...` will trigger the `on` method.
- `onmethod` or `onMethod` are treated equally

The second argument, if it is an `Object` will be passed to the constructor. It will also look for prototype methods which match the key name, when it finds matching prototypes, it will execute them.

```javascript
el(MyComponent, {
    class : 'this-class', // Will actually trigger the components `addClass` method
    onclick : function () {}, // onclick and onClick are functionally identical
    onClick : function () {},
    componentMethod : argument // Will be passed as a single argument to your method
  },
  'text' // Will trigger the `text` method for the component
);
```
