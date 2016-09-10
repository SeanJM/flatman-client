var a = el({ class : 'a' });

return {
  left : a.removeClass('a').hasClass('a'),
  right : false
};
