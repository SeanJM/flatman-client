var el = flatman.el;
var a = el('div', { className : [ 'test', 'test1' ]});

return {
  left : (
    a.hasClass(['test', 'test1'])
  ),
  right : true
};
