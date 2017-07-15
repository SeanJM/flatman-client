Input has been unified across browsers, so that when you use `on('input')` you will have consistent performance on Internet Explorer, Chrome and Firefox.

In this example, we'll write a component to replace creating an input with `el('input', { type : 'text' })` with a Component, so that the API becomes `el(Editbox)`.

```javascript
function Editbox() {
  var self = this;
  this.node = {
    document : el('input',
      {
        type : 'text',
        onInput : function (e) {
          self.trigger('input', e);
        }
      }
    )
  };
}

Editbox.prototype.value = function (value) {
  var f = this.node.document.value;
  if (!value) {
    return f();
  }
  f(value);
};

var a = el(Editbox, {
  onInput : function (e) {
    console.log(this.value());
  }
});

```
