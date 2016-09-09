```javascript
function Component(options) {
  this.node = {};
  this.node.document = el('div',
    this.node.label = el('div', { class : 'text' })
  );
}

Component.prototype.appendTo = function (target) {
  if (typeof target.append === 'function') {
    target.append(this.node.document);

    this.trigger('appendto');  

    if (this.node.document.hasParent('body')) {
      this.trigger('body');
    }
  } else {
    throw 'Invalid target: "' + target.constructor.name + '"';
  }
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

// A function to add the minimum prototypes to a constructor
Component.extend = function (Constructor) {
  Constructor.prototype.appendTo = Component.prototype.appendTo;
  Constructor.prototype.addClass = Component.prototype.addClass;
  Constructor.prototype.on = Component.prototype.on;
};
```

- Putting it together

```javascript
el(Component, {
    class : 'my-component-class',

    onClick : function () {
      // What it does when it's clicked on
    },
    onAppendTo : function () {
      // What it does when it's appended
    },
    onBody : function () {
      // What it does when it's appended to the body
    }
  },
  'My Text'
);
```
