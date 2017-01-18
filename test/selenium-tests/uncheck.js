var el = flatman.el;
var a = el('input', { type : 'checkbox' });
var value = [];

a.check();
value.push(a.isChecked());

a.uncheck();
value.push(a.isChecked());

return {
  left : value[0] && !value[1],
  right : true
};
