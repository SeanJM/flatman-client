var el = flatman.el;
var isMounted = false;

var a = el('div', {
  onMount: function () {
    isMounted = true;
  }
});

var b = el('div');

a.appendTo(b);

b.appendTo(document.body);

return {
  left : isMounted,
  right : true
};
