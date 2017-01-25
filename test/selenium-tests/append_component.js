var el = flatman.el;
var Component = flatman.Component;
var a = el('div');
var b = el('div');

Component.create('C', {
  render() {
    return b;
  }
});

a.append([el('C')]);

console.log(a);

return {
  left : a.children(0).node === b.node,
  right : true
};
