var b = el({ class : 'a b c' });

return {
  left : b.removeClass(['a', 'c']).hasClass('b'),
  right : true
};
