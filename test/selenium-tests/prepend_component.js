var el = flatman.el;
var Component = flatman.Component;
var b = el('div');
var c = el('div');

Component.lib = {};

Component.create('a', {
  render() {
    return el('div', [ c ]);
  }
});

var a = el('a');

a.prepend(b);

return {
  left : a.children(0).node === b.node,
  right : true
};
