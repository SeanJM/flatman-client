var p = el('div', { class : 'test' });
var c = p.clone();

return {
  left : p.attr('class'),
  right : c.attr('class')
};
