var el = flatman.el;
var Component = flatman.Component;
var a = el('div');
var b = el('div');

Component.lib = {};

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
    p.document === a
    && p.document.attr('class') === 'test'
    && p.document.children()[0] === b
  ),
  right : true
};