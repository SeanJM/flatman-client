var isMounted = false;

var b = el('div');

var a = el('div', {
  className : 'test',
  onMount : function () {
    isMounted = !isMounted;
  }
}, [ 'test' ]);

b.append([a]);

b.appendTo(document.body);

return {
  left : isMounted,
  right : true
};
