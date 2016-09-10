var a = el({ class : 'a' });
var b = el({ class : 'b' });
var c = el({ class : 'c' });
var p;

a.append(b.append(c));
p = c.parents();

return {
  left : p[1].node === a.node,
  right : true
};
