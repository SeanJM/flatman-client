var el = flatman.el;
var a = el('div');
var b = el('div');

Component.create('C', {
  render(props) {
    a.addClass(props.className);
    a.append([b]);
    return a;
  }
});

var p = el('C', { className : 'test' });

return {
  left : (
    p.node.document.node === a.node
    && p.node.document.attr('class') === 'test'
    && p.node.document.children()[0].node === b.node
  ),
  right : true
};