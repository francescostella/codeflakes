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

  // Creating a tmp canvas
  this.tmp_canvas = document.createElement('canvas');
  this.tmp_ctx = this.tmp_canvas.getContext('2d');
  this.tmp_canvas.id = 'tmp_canvas';
  this.tmp_canvas.width = this.canvas.width;
  this.tmp_canvas.height = this.canvas.height;
  document.querySelector('body').appendChild(this.tmp_canvas);

  this.mouse = {x: 0, y: 0};
  this.last_mouse = {x: 0, y: 0};
  
  // Pencil Points
  this.ppts = [];
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

  self.tmp_canvas.addEventListener('mousemove', function(e) {
    self.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    self.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  }, false);


/* Drawing on Paint App */
  self.tmp_ctx.lineWidth = 5;
  self.tmp_ctx.lineJoin = 'round';
  self.tmp_ctx.lineCap = 'round';
  self.tmp_ctx.strokeStyle = 'blue';
  self.tmp_ctx.fillStyle = 'blue';
  
  self.tmp_canvas.addEventListener('mousedown', function(e) {
    self.tmp_canvas.addEventListener('mousemove', self.draw, false);
    
    self.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    self.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
    
    self.ppts.push({x: self.mouse.x, y: self.mouse.y});
    
    self.draw();
  }, false);
  
  self.tmp_canvas.addEventListener('mouseup', function() {
    self.tmp_canvas.removeEventListener('mousemove', self.draw, false);
    
    // Writing down to real canvas now
    self.ctx.drawImage(self.tmp_canvas, 0, 0);
    // Clearing tmp canvas
    self.tmp_ctx.clearRect(0, 0, self.tmp_canvas.width, self.tmp_canvas.height);
    
    // Emptying up Pencil Points
    self.ppts = [];
  }, false);

  // self.canvas.onmousedown = function (e) {
  //   self.draw(e);
  // };

  // self.canvas.onmousemove = function (e) {
  //   self.draw(e);
  // };

  // self.canvas.onmouseup = function (e) {
  //   self.draw(e);
  // };
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


TLPainter.prototype.draw = function() {
  var self = this;
    // Saving all the points in an array
    self.ppts.push({x: self.mouse.x, y: self.mouse.y});
    
    if (self.ppts.length < 3) {
      var b = self.ppts[0];
      self.tmp_ctx.beginPath();
      //ctx.moveTo(b.x, b.y);
      //ctx.lineTo(b.x+50, b.y+50);
      self.tmp_ctx.arc(b.x, b.y, self.tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
      self.tmp_ctx.fill();
      self.tmp_ctx.closePath();
      
      return;
    }
    
    // Tmp canvas is always cleared up before drawing.
    self.tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    
    self.tmp_ctx.beginPath();
    self.tmp_ctx.moveTo(self.ppts[0].x, self.ppts[0].y);
    
    for (var i = 1; i < self.ppts.length - 2; i++) {
      var c = (self.ppts[i].x + self.ppts[i + 1].x) / 2;
      var d = (self.ppts[i].y + self.ppts[i + 1].y) / 2;
      
      self.tmp_ctx.quadraticCurveTo(self.ppts[i].x, self.ppts[i].y, c, d);
    }
    
    // For the last 2 points
    self.tmp_ctx.quadraticCurveTo(
      self.ppts[i].x,
      self.ppts[i].y,
      self.ppts[i + 1].x,
      self.ppts[i + 1].y
    );

    self.tmp_ctx.stroke();
};
