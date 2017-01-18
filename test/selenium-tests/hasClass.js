var el = flatman.el;
var a = el('div', { className : 'test'});
var b = el('div', { className : 'test-2'});

return {
  left : (
    a.hasClass('test')
    && b.hasClass('test-2')
  ),
  right : true
};
