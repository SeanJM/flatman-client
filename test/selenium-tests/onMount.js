var isMounted = false;

var a = el('div', {
  className : 'test',
  onMount : function () {
    isMounted = !isMounted;
  }
});

a.appendTo(document.body);
a.appendTo(document.body);

return {
  left : isMounted,
  right : true
};
