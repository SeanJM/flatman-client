var el = flatman.el;
var Component = flatman.Component;
var a = el('div', { name : 'a' });
var b = el('div', { name : 'b' });
var c = el('div', { name : 'c' });

Component.create('C', {
  render() {
    a.append([ b.append([ c ]) ]);
    return a;
  }
});

var p = el('C');

return {
  left : (
    p.node.document.node === a.node &&
    p.node.b.node === b.node &&
    p.node.c.node === c.node
  ),
  right : true
};