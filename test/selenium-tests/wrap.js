var el = flatman.el;
var Component = flatman.Component;
var wrap = flatman.wrap;
var t;

Component.create('B', {
  value() {
    return 'b';
  },

  classify() {
    this.node.document.addClass('classify');
  },

  getClassify() {
    return 'classify';
  },

  render(props) {
    return el('div', {
      name : 'b',
      className : 'b'
    });
  }
});

Component.create('A', wrap('B', {
  value() {
    return this.node.b.value();
  },

  render(props) {
    return el('div', [ this.node.component ]);
  }
}));

t = el('A');

t.classify();

return {
  left : t.value() === 'b' && t.getClassify() === 'classify',
  right : true
};