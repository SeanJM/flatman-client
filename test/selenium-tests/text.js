var el = flatman.el;
var a = el('div', [
  el('div'),
  el('div')
]);

a.text('text');

return {
  left : a.text(),
  right : 'text'
};
