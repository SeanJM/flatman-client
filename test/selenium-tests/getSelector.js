var p = el({ class : 'test'});

var a = el({
  class : 'test',
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
