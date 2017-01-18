var el = flatman.el;
var a = el('div', { name : 'checkbox' });

return {
  left : a.name() === 'checkbox',
  right : true
};
