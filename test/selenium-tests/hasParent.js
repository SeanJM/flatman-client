var a = el('div', { className : 'test'});
var b = el('div', { className : 'test-2'});

a.append([b]);

return {
  left : b.hasParent(a) && !a.hasParent(b),
  right : true
};
