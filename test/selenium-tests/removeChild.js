var el = flatman.el;
var Component = flatman.Component;
var a = el('div');
var b = el('div');
var c = el('div');
var results = [];

Component.lib = {};

Component.create('C', {
  render() {
    return el('div');
  }
});

var d = el('C');

a.append([ b, c, d ]);
a.removeChild(b);
results.push(!a.contains(b) && a.children().length === 2 && a.children()[0].node === c.node);

a.removeChild(c);
results.push(!a.contains(c.getNode()) && a.children().length === 1);

a.removeChild(d);
results.push(!a.contains(d.getNode()));

console.log(results);

return {
  left : results[0] && results[1] && results[2],
  right : true
};
