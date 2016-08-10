/*
  Argument format
  CreateNode([String], [Object], [Text | CreateNode Object | Array | Node ])
*/

function CreateNode () {
  var that = this;
  var doubleclick = false;
  var attributes = {};
  var values = [];
  var i = 1;
  var n = arguments.length;
  var isSVG = SVG_TAGNAMES.indexOf(arguments[0]) !== -1;
  var className;

  this.subscribers = {};

  if (arguments[0] instanceof CreateNode) {
    this.node = arguments[0].node;
    this.subscribers = arguments[0].subscribers;
  } else if (isElement(arguments[0]) || arguments[0] === window) {
    this.node = arguments[0];
  } else if (isString(arguments[0]) || isObject(arguments[0])) {
    if (isString(arguments[0])) {
      if (isSVG) {
        this.node = document.createElementNS(SVG_NAMESPACE, arguments[0]);
      } else {
        this.node = document.createElement(arguments[0]);
      }
      i = 1;
    } else if (isObject(arguments[0])) {
      this.node = document.createElement('div');
      i = 0;
    }

    if (isObject(arguments[i]) && !(arguments[i] instanceof CreateNode)) {
      attributes = arguments[i];
    }

    for (var k in attributes) {
      if (k === 'class') {
        className = filter(map(attributes[k].split(' '), trim), hasLength);
        if (isSVG) {
          this.node.setAttributeNS(null, 'class', className.sort().join(' '));
        } else {
          this.node.className = className.sort().join(' ');
        }
      } else if (k === 'style') {
        setStyle(this.node, attributes[k]);
      } else if (/on[A-Z][a-z]/.test(k.substr(0, 4))) {
        // A fast test to see if the property matches "onClick" or "onKeyup" or
        // "onScroll" pattern
        if (isFunction(attributes[k])) {
          this.on(k.substr(2).toLowerCase(), attributes[k]);
        } else {
          throw '\"' + k + '\" must have a function as a value.';
        }
      } else {
        this.node.setAttribute(k, attributes[k]);
      }
    }

    for (; i < n; i++) {
      if (arguments[i] instanceof CreateNode) {
        this.node.appendChild(arguments[i].node);
      } else if (isString(arguments[i])) {
        this.node.appendChild(new Text(arguments[i]));
      } else if (
        arguments[i]
        && typeof arguments[i].appendTo === 'function'
      ) {
        arguments[i].appendTo(this.node);
      }
    }
  } else if (typeof arguments[0] === 'undefined') {
    throw 'Invalid argument \'undefined\' for createNode.';
  }

  if (IS_IE && isTextInput(this.node)) {
    // Normalize IE 9 input event
    this.node.addEventListener('keyup', function (e) {
      if (e.target === this.node) {
        if (!values.length) {
          values = [
            this.node.value,
            this.node.value
          ];
        } else {
          values[0] = values[1];
          values[1] = this.node.value;
        }

        if (values[0] !== values[1] && (e.which === IS_DELETE_KEY || e.which === IS_BACKSPACE_KEY)) {
          this.trigger('input', {
            type : 'input',
            which : e.which
          });
        }
      }
    }, false);
  }

  // Double click
  this.node.addEventListener('click', function (e) {
    if (doubleclick) {
      that.trigger('doubleclick', e);
    } else {
      doubleclick = true;
    }
    setTimeout(function () {
      doubleclick = false;
    }, 250);
  });

  // Drag
  this.node.addEventListener('mousedown', function (e) {
    var dragstart = false;
    var startX = e.pageX;
    var startY = e.pageY;

    var dragmove;
    var dragend;

    document.body.addEventListener('mouseup', dragend = function (e) {
      var eve = {
        type : 'dragend',
        startX : startX,
        startY : startY,
        pageX : e.pageX,
        pageY : e.pageY,
        distanceX : startX - e.pageX,
        distanceY : startY - e.pageY,
        target : that
      };

      document.body.removeEventListener('mousemove', dragmove);
      document.body.removeEventListener('mousemove', dragend);

      dragstart = false;
      document.body.style[VENDOR_PREFIX.userSelect] = '';
      that.trigger('dragend', eve);
    });

    document.body.addEventListener('mousemove', dragmove = function (e) {
      var eve = {
        type : 'dragstart',
        startX : startX,
        startY : startY,
        pageX : e.pageX,
        pageY : e.pageY,
        distanceX : e.pageX - startX,
        distanceY : e.pageY - startY,
        target : that
      };

      if (
        (Math.abs(startX - e.pageX) + Math.abs(startY - e.pageY)) > 5
        && !dragstart
      ) {
        that.trigger('dragstart', eve);
        dragstart = true;
        document.body.style[VENDOR_PREFIX.userSelect] = 'none';
      } else if (dragstart) {
        eve.type = 'dragmove';
        that.trigger('dragmove', eve);
      }
    });
  });

  this.check = this.node.check;
  this.style = this.node.style;
  this.style.transform = this.style[VENDOR_PREFIX.transform];
  this.style.userSelect = this.style[VENDOR_PREFIX.userSelect];
  this.style.userModify = this.style[VENDOR_PREFIX.userModify];
}
