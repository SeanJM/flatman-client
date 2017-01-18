var el = flatman.el;
var a = el('div', { className : 'test test1 test2' });
var classList = a.classList();

return {
  left : classList[0] === 'test' && classList[1] === 'test1' && classList[2] === 'test2',
  right : true
};
