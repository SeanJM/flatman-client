You can pass your component any options.

- Keys will be checked for matching methods
- The options will be passed as an argument to the Component constructor
- on* is used to attach event listeners on initialization
- `onmethod` or `onMethod` are treated equally

```
el(Component, {
  class : 'this-class', // Will actually trigger the components `addClass` method
  onclick : function () {}, // onclick and onClick are functionally identical
  onClick : function () {},
  componentMethod : argument // Will be passed as a single argument to your method
  init : [ 'method', 'method' ] // Functions to run last
})
```
