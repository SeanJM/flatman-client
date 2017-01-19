var el = flatman.el;
var Component = flatman.Component;
var a = el('div');
var b = el('div');
var c = el('div');
var results = [];

Component.create('C', {
  remove() {
    var p = this.parentNode;
    var index = p.childNodes.indexOf(this);
    this.node.document.remove();
    p.childNodes.splice(index, 1);
  },
  render() {
    return el('div');
  }
});

var d = el('C');

a.append([ b, c, d ]);
a.removeChild(b);
results.push(!a.contains(b) && a.childNodes.length === 2 && a.childNodes[0] === c);

a.removeChild(c);
results.push(!a.contains(c) && a.childNodes.length === 1);

a.removeChild(d);
results.push(!a.contains(d));

return {
  left : results[0] && results[1] && results[2],
  right : true
};
