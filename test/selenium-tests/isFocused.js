var el = flatman.el;
var a = el('input', { type : 'checkbox' });
var b = el('input', { type : 'checkbox' });

a.appendTo(document.body);
b.appendTo(document.body);

a.focus();

return {
  left : a.isFocused() && !b.isFocused(),
  right : true
};
