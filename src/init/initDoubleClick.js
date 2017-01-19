function initDoubleClick() {
  var isDoubleClick = false;

  // Double click
  document.body.addEventListener('click', function (e) {
    if (isDoubleClick) {
      e.target.dispatchEvent(
        new MouseEvent('doubleclick', {
          clientX : e.pageX,
          clientY : e.pageY,
          bubbles : true,
          cancelable : true
        })
      );

    } else {
      isDoubleClick = true;
    }

    setTimeout(function () {
      isDoubleClick = false;
    }, 250);

  });
}
