var a = el('div');

a.style('fontSize', 13);
a.appendTo(document.body);

return {
  left : a.style('fontSize') === '13px',
  right : true
};
