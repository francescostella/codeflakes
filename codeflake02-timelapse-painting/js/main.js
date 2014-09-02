(function () {
  'use strict';
  var canvas = document.getElementById('time-paint');

  var newTimePaint = new TLPainter(canvas);
  newTimePaint.init();

  window.onresize = function () {
    resizeCanvas();
  };

  document.addEventListener('DOMContentLoaded', function(){
    resizeCanvas();
  });

  var resizeCanvas = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
})();