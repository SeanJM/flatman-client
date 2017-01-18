var el = flatman.el;
var p = el('div', { className : 'test'});

var a = el('div', {
  className : 'test',
  tabIndex : '0',
  id : 'my-id'
});

return {
  right : (
    p.getSelector() === 'div.test'
    && a.getSelector() === 'div.test#my-id'
  ),
  left : true
};
