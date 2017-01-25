function initDragAndDrop() {
  document.addEventListener('mousedown', function (e) {
    var startX = e.pageX;
    var startY = e.pageY;
    var isDrag = false;
    var target = e.target;

    function dragend(e) {
      var eve = new CustomEvent('dragend', {
        detail : {
          startX : startX,
          startY : startY,
          pageX : e.pageX,
          pageY : e.pageY,
          distanceX : e.pageX - startX,
          distanceY : e.pageY - startY,
        },
        target : target,
        bubbles : true,
        cancelable : true
      });

      document.removeEventListener('mousemove', dragmove);
      document.removeEventListener('mouseup', dragend);

      if (e.which === 1 && isDrag) {
        isDrag = false;
        document.style[ VENDOR_PREFIX.userSelect ] = '';
        document.style.cursor = '';
        target.dispatchEvent(eve);
      }
    }

    function dragmove(e) {
      var opt = {
        detail : {
          startX : startX,
          startY : startY,
          pageX : e.pageX,
          pageY : e.pageY,
          distanceX : e.pageX - startX,
          distanceY : e.pageY - startY,
        },
        target : target,
        bubbles : true,
        cancelable : true
      };

      if (
        Math.abs(startX - e.pageX) + Math.abs(startY - e.pageY) > 5
        && !isDrag
      ) {
        isDrag = true;
        target.dispatchEvent(new CustomEvent('dragstart', opt));
      } else if (isDrag) {
        target.dispatchEvent(new CustomEvent('dragmove', opt));
      }
    }

    // Ensure it's left click which starts the dragging
    if (e.which === 1) {
      document.addEventListener('mouseup', dragend);
      document.addEventListener('mousemove', dragmove);
    }
  });
}
