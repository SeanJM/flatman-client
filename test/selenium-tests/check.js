var a = el('input', { type : 'checkbox' });

a.check();

return {
  left : a.isChecked(),
  right : true
};
