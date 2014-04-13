
'use strict';

window.requestAnimFrame = (function(callback) {
      return window.requestAnimationFrame || 
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame || 
      window.oRequestAnimationFrame || 
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    })();

var TLPainter = function (canvas) {
  this.isDrawing = false;
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  console.log(this.ctx);
};

TLPainter.prototype.init = function() {
  var self = this;
  var lastTime = null;

  this.bindings();

  // var doFrame = function (time) {
  //   if ( lastTime === null ) {
  //     lastTime = time;
  //   }

  //   var delta = (time - lastTime) / 1000;
  //   lastTime = time;

  //   self.update(delta);
  //   self.render(delta);

  //   window.requestAnimFrame(doFrame);
  // }

  // window.requestAnimFrame(doFrame);
};

TLPainter.prototype.bindings = function () {
  var self = this;

  self.canvas.onmousedown = function (e) {
    self.draw(e);
  };

  self.canvas.onmousemove = function (e) {
    self.draw(e);
  };

  self.canvas.onmouseup = function (e) {
    self.draw(e);
  };
};

TLPainter.prototype.update = function (delta) {

};

TLPainter.prototype.render = function (delta) {
  // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};


TLPainter.prototype.draw = function(e) {
  var self = this;
  var x = e.pageX - self.canvas.offsetLeft,
      y = e.pageY - self.canvas.offsetTop;

  if (e.type === 'mousedown') {
    self.ctx.beginPath();
    self.ctx.moveTo(x, y);
    self.isDrawing = true;
    console.log('mousedown');
  }

  if (e.type === 'mousemove') {
    if (self.isDrawing) {
      self.ctx.lineTo(x, y);
      self.ctx.stroke();
      console.log('mousemove');
    }
  }

  if (e.type === 'mouseup') {
    self.isDrawing = false;
    console.log('mouseup');
  }

};
