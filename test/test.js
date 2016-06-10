function Comp () {
  this.el = el('div',
    this.doc = el('div', {
      class : 'child_child-1'
    }),
    this.an = el('div', {
      class : 'child_child-2'
    }),
    this.an = el('div', {
      class : 'child_child-3'
    }),
    this.ab = el('div', {
      class : 'child_child-4'
    }),
    this.ab = el('div', el('div'))
  );
  console.log(this.el);
}

Comp.prototype.put = function () {
  this.el.appendTo(document.body);
};

var test = new Comp();

test.put();
