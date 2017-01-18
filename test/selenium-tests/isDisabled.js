var el = flatman.el;
var a = el('input', { type : 'checkbox'});
var b = el('input', { type : 'checkbox'});

a.disable();

return {
  right : a.isDisabled() && !b.isDisabled(),
  left : true
};
