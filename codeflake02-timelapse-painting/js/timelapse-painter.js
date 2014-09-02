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

  var doFrame = function (time) {
    if ( lastTime === null ) {
      lastTime = time;
    }

    var delta = (time - lastTime) / 1000;
    lastTime = time;

    self.update(delta);
    self.render(delta);

    window.requestAnimFrame(doFrame);
  }

  window.requestAnimFrame(doFrame);
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
  // Logic to update
};

TLPainter.prototype.render = function (delta) {
  // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  // Logic to render
};

TLPainter.prototype.colorTimeLapse = function (delta) {
  var color = 'red';

  var formatColor = function (i) {
    if (i.length < 2) {
      i = '0' + i;
    }
    return i;
  };

  var timeColor = function (hour, min, sec) {
    var red = Math.round(255 * (hour / 23)).toString(16);
    var green = Math.round(255 * (min / 59)).toString(16);
    var blue = Math.round(255 * (sec / 59)).toString(16);

    red = formatColor(red);
    green = formatColor(green);
    blue = formatColor(blue);

    return (red + green + blue).toUpperCase();
  };

  var now = new Date();
  var hour =  now.getHours();
  var min =  now.getMinutes();
  var sec =  now.getSeconds();
  color = timeColor(hour, min, sec);


  return color;
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
      self.ctx.strokeStyle = self.colorTimeLapse();
      self.ctx.lineWidth = 3;
      self.ctx.stroke();
      console.log('mousemove');
    }
  }

  if (e.type === 'mouseup') {
    self.isDrawing = false;
    console.log('mouseup');
  }

};
