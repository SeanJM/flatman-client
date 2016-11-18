var p = el('div', { tabIndex : '0' });

p.appendTo(document.body);
p.focus();

setTimeout(function () {
  p.remove();
}, 100);

return {
  left : p.isFocused(),
  right : true
};
