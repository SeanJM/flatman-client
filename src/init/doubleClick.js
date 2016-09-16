(function () {
  var isDoubleClick = false;

  // Double click
  document.body.addEventListener('click', function (e) {
    if (isDoubleClick) {
      e.target.dispatchEvent(

        new CustomEvent('doubleclick', {
          pageX : e.pageX,
          pageY : e.pageY,
          bubbles : true
        })
      );

    } else {
      isDoubleClick = true;
    }

    setTimeout(function () {
      isDoubleClick = false;
    }, 250);

  });

}());
