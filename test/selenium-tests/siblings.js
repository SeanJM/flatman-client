var a;
var b;

el({ class : '1' },
  a = el({ class : '1_1'}),
  el({ class : '1_2'}),
  el({ class : '1_3'}),
  b = el({ class : '1_4'})
);

return {
  left : a.siblings()[3].node === b.node,
  right : true
};
