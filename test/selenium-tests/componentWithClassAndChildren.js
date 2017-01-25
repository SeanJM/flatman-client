var el = flatman.el;
var Component = flatman.Component;
var a = el('div');
var b = el('div');

Component.lib = {};

Component.create('C', {
  render(props) {
    a.addClass(props.className);
    return a.append([b]);
  }
})

var p = el('C', { className : 'test' });

return {
  left : (
    p.node.document.node === a.node
    && p.node.document.attr('class') === 'test'
    && p.node.document.children()[0].node === b.node
  ),
  right : true
};