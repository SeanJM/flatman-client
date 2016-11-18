var a = el('div', { class : 'test'});
var b = el('div', { class : 'test-2'});

a.append(b);

return {
  left : b.hasParent(a) && !a.hasParent(b),
  right : true
};
