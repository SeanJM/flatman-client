var a = el('div', { class : 'a' });

return {
  left : a.removeClass('a').hasClass('a'),
  right : false
};
