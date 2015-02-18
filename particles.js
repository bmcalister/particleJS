/**
 * particles.js
 * http://github.com/bmcalister
 *
 * Copyright (c) 2014 Brian Mc Alister
 */

;(function(global, undefined) {

  /**
   * VECTOR
   */
  var Vector = function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  Vector.prototype = {
    add: function(vector) {
      this.x += vector.x;
      this.y += vector.y;
    },
    subtract: function() {
      this.x -= vector.x;
      this.y -= vector.y;
    },
    getMagnitude: function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  };

  /**
   * PARTICLE
   */
  var Particle = function Particle(position, velocity, radius, color) {
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.radius = radius || 2;
    this.color = color || 'rgba(0,0,0,0.5';
  }

  Particle.prototype = {
    move: function(maxX, maxY) {

      if(this.velocity.x + this.position.x > maxX + this.radius / 2) { // if new X is bigger than maxX
        this.position.x = 0 - this.radius / 2;
      }else if(this.velocity.x + this.position.x < 0 - this.radius / 2) { // if new X is smaller than 0
        this.position.x = maxX + this.radius / 2;
      }else{ // normal
        this.position.x += this.velocity.x
      }

      if(this.velocity.y + this.position.y > maxY + this.radius / 2) { // if new Y is bigger than maxY
        this.position.y = 0 - this.radius / 2;
      }else if(this.velocity.y + this.position.y < 0 - this.radius / 2) { // if new Y is smaller than 0
        this.position.y = maxY + this.radius / 2;
      }else{ // normal
        this.position.y += this.velocity.y
      }

      //this.position.add(this.velocity);
    }
  };

  global.Particle = Particle;
  global.Vector = Vector;

})(window);