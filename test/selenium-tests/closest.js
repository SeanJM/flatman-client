var a = el({ class : 'test' });
var b = el({ class : 'test2' });
var c = el({ class : 'test3' });

a.append(b.append(c));

return {
  left : c.closest('.test2').node === b.node,
  right : true
};
