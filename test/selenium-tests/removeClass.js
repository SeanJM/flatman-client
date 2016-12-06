var a = el('div', { className : 'a' });

return {
  left : a.removeClass('a').hasClass('a'),
  right : false
};
