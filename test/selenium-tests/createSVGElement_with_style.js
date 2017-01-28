var el = flatman.el;

var a = el('svg', {
  style : {
    display : 'none'
  }
});

return {
  left : a.attr('style'),
  right : 'display: none;'
};
