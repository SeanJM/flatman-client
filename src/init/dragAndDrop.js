document.body.addEventListener('mousedown', function (e) {
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

    document.body.removeEventListener('mousemove', dragmove);
    document.body.removeEventListener('mouseup', dragend);

    if (e.which === 1 && isDrag) {
      isDrag = false;
      document.body.style[ VENDOR_PREFIX.userSelect ] = '';
      document.body.style.cursor = '';
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
    document.body.addEventListener('mouseup', dragend);
    document.body.addEventListener('mousemove', dragmove);
  }
});
