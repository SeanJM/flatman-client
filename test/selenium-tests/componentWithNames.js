var el = flatman.el;
      var Component = flatman.Component;

      Component.lib = {};
      Component.create('C', {
        render() {
          return el('div', [ el('div', { name : 'b' }), el('div', { name : 'c' }) ]);
        }
      });

      Component.create('D', {
        render() {
          return el('C');
        }
      });

      var p = el('C');
      var q = el('D');

      return {
        left : (
          p.names.b.name() === 'b' &&
          p.names.c.name() === 'c' &&
          q.names.b.name() === 'b' &&
          q.names.c.name() === 'c'
        ),
        right : true
      };