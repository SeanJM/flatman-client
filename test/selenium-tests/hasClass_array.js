var el = flatman.el;
var a = el('div', { className : 'test test1'});
var b = el('div', { className : 'test-2'});

return {
  left : (
    a.hasClass(['test', 'test1'])
    && b.hasClass('test-2')
  ),
  right : true
};
