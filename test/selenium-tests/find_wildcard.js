var el = flatman.el;
var a;
var p = el('div', [
  el('div', { className : 'parent' }, [
    a = el('input', { type : 'radio'})
  ])
]);

return {
  left : p.find('.parent [type*="ra"]')[0].node === a.node,
  right : true
};
