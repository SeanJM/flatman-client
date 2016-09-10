var a = el({ class : 'test'});
var b = el({ class : 'test-2'});

return {
  left : (
    a.hasClass('test')
    && b.hasClass('test-2')
  ),
  right : true
};
