var Component = flatman.Component;
var el = flatman.el;

Component.lib = {};

Component.create('C', {
  render() {
    return el('div', { className : 'children-test' });
  }
});

var p = el('C', [
  el('div'),
  el('div'),
  el('div'),
  el('div')
]);

return {
  left : (
    p.document.children().length === 4
  ),
  right : true
};