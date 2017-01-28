var el = flatman.el;

var a = el('div', {
  style : {
    display : 'none'
  }
});

return {
  left : a.attr('style'),
  right : 'display: none;'
};
