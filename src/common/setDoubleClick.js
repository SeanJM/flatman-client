function setDoubleClick() {
  var doubleclick = false;
  
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

    // Ensure it's left click which starts the dragging
    if (e.which === 1) {
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
        document.body.removeEventListener('mouseup', dragend);

        if (e.which === 1 && dragstart) {
          dragstart = false;
          document.body.style[VENDOR_PREFIX.userSelect] = '';
          document.body.style.cursor = '';
          that.trigger('dragend', eve);
        }
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
          document.body.style.cursor = 'default';
        } else if (dragstart) {
          eve.type = 'dragmove';
          that.trigger('dragmove', eve);
        }
      });
    }
  });
}
