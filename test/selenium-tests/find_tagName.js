var el = flatman.el;
var a;
var p = el('div', [ a = el('input', { type : 'radio'}) ]);

return {
  left : p.find('input')[0].node === a.node,
  right : true
};
