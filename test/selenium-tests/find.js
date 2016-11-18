var a;
var p = el('div', [ a = el('div', { class : 'test'}) ]);

return {
  left : p.find('.test')[0].node === a.node,
  right : true
};
