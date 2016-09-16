document.body.addEventListener('mousedown', function (e) {
  var startX = e.pageX;
  var startY = e.pageY;
  var isDrag = false;

  function dragend(e) {
    var eve = new CustomEvent('dragend', {
      startX : startX,
      startY : startY,
      pageX : e.pageX,
      pageY : e.pageY,
      distanceX : e.pageX - startX,
      distanceY : e.pageY - startY,
      target : e.target,
      bubbles : true
    });

    document.body.removeEventListener('mousemove', dragmove);
    document.body.removeEventListener('mouseup', dragend);

    if (e.which === 1 && isDrag) {
      isDrag = false;
      document.body.style[ VENDOR_PREFIX.userSelect ] = '';
      document.body.style.cursor = '';
      e.target.dispatchEvent(eve);
    }
  }

  function dragmove(e) {
    var eve = new CustomEvent('dragstart', {
      startX : startX,
      startY : startY,
      pageX : e.pageX,
      pageY : e.pageY,
      distanceX : e.pageX - startX,
      distanceY : e.pageY - startY,
      target : e.target,
      bubbles : true
    });

    if (
      Math.abs(startX - e.pageX) + Math.abs(startY - e.pageY) > 5
      && !isDrag
    ) {
      isDrag = true;
      e.target.dispatchEvent(eve);
      document.body.style[VENDOR_PREFIX.userSelect] = 'none';
      document.body.style.cursor = 'default';
    } else if (isDrag) {
      eve.type = 'dragmove';
      e.target.dispatchEvent(eve);
    }
  }

  // Ensure it's left click which starts the dragging
  if (e.which === 1) {
    document.body.addEventListener('mouseup', dragend);
    document.body.addEventListener('mousemove', dragmove);
  }
});
