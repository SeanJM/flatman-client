var a = el('input', { type : 'checkbox' });
var value = [];

a.check();
value.push(a.isChecked());

a.uncheck();
value.push(a.isChecked());

return {
  left : value,
  right : [ true, false ]
};
