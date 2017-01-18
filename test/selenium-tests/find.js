var el = flatman.el;
var a;
var p = el('div', [ a = el('div', { className : 'test'}) ]);

return {
  left : p.find('.test')[0].node === a.node,
  right : true
};
