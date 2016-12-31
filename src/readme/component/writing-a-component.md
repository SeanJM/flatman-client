```javascript
function Component(options) {
  // Optional code
}

// The root node is always 'this.node.document'
// When you name a child node it's name will be automatically added to 'this.node'

Component.prototype.render = function () {
  return el('div', [
    el('div', { name : 'label', className : 'text' }, [ this.dict.text ])
  ]);
};

Component.prototype.appendTo = function (target) {
  target.append(this.node.document);
};

Component.prototype.addClass = function (className) {
  this.node.document.addClass(className);
};

Component.prototype.on = function (name, callback) {
  this.node.document.on(name, callback);
};

Component.prototype.text = function (text) {
  this.node.label.text(text);
};

// A function to extend the prototypes of a constructor
Component.extend = function (Constructor) {
  for (var k in Component.prototype) {
    if (!Constructor.prototype[k]) {
      Constructor.prototype[k] = Component.prototype[k];
    }
  }
};
```

- Putting it together

```javascript
el(Component, {
  className : 'my-component-class',
  text : 'My Text',
  onClick : function () {
    // What it does when it's clicked on
  }
});
```
