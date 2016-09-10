var a = el({ class : 'test'});
var b = el({ class : 'test-2'});

a.append(b);

return {
  left : b.hasParent(a) && !a.hasParent(b),
  right : true
};
