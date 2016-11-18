var b = el('div', { class : 'a b c' });

return {
  left : b.removeClass(['a', 'c']).hasClass('b'),
  right : true
};
