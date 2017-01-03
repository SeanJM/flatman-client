var a = el('div', { className : 'test'});

a.appendTo(document.body);

return {
  left : a.hasParent(document.body),
  right : true
};
