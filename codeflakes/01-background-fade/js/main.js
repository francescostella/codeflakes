(function () {
  'use strict';

  var Surprise = function (button) {
    this.button = button;
  };

  Surprise.prototype.run = function() {
    this.bindings();
  };

  Surprise.prototype.bindings = function() {
    this.button.addEventListener('click', this.opsYouClickedMe);
  };

  Surprise.prototype.opsYouClickedMe = function () {
    document.body.style.backgroundColor = '#' + Math.random().toString(16).slice(2, 8);
  };

  // Init
  var redButton = new Surprise(document.getElementById('dont-click-me'));
  redButton.run();

})();