var a = el('input', { type : 'checkbox' });
var b = el('input', { type : 'checkbox' });

a.appendTo('body');
b.appendTo('body');

a.focus();

return {
  left : a.isFocused() && !b.isFocused(),
  right : true
};
