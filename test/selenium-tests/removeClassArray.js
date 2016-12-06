var b = el('div', { className : 'a b c' });

return {
  left : b.removeClass(['a', 'c']).hasClass('b'),
  right : true
};
