var isMounted = true;

var a = el('div', {
  className : 'test',
  onUnmount : function () {
    isMounted = !isMounted;
  }
}, [ 'test' ]);

a.appendTo(document.body);
a.remove();

return {
  left : isMounted,
  right : false
};
