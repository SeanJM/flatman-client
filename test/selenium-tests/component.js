var el = flatman.el;
var Component = flatman.Component;
var a = el('div');

Component.create('C', {
  render() {
    return a;
  }
});

var p = el('C');

return {
  left : (
    p.node.document.node === a.node
  ),
  right : true
};
