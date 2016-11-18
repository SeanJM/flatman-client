var a = el('div', { class : 'test'});
var b = el('div', { class : 'test-2'});

return {
  left : (
    a.hasClass('test')
    && b.hasClass('test-2')
  ),
  right : true
};
