/**
 * Particle Animation
 * http://github.com/bmcalister
 *
 * Copyright (c) 2014 Brian Mc Alister
 */

;(function(global, undefined) {

  var canvas = document.querySelector('#particleCanvas');
  var ctx = canvas.getContext('2d');

  var starS = {
    image: new Image(),
    width: 5,
    height: 5
  };

  var starM = {
    image: new Image(),
    width: 9,
    height: 9
  };

  var starL = {
    image: new Image(),
    width: 14,
    height: 14
  };

  starS.image.src = 'images/stars.png';
  starM.image.src = 'images/star.png';
  starL.image.src = 'images/starm.png';
   
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var particles = [],
      stars = [starS, starM, starL],
      mouse = new Particle(new Vector(0,0), new Vector(0,0), 0, ''),
      numParticles = 250,
      maxVelocity = 0.2,
      distanceLink = 150;

  document.addEventListener('mousemove', function(e){ 
    mouse.position.x = e.clientX || e.pageX; 
    mouse.position.y = e.clientY || e.pageY;
  }, false);



  for(var i = 0; i < numParticles; i++) {

    var pX = Math.random() * window.innerWidth,
        pY = Math.random() * window.innerHeight,
        vX = Math.random() * maxVelocity * 2 - maxVelocity,
        vY = Math.random() * maxVelocity * 2 - maxVelocity,
        size = 1;

    var particle = new Particle(new Vector(pX, pY), new Vector(vX, vY), size, 'rgba(224,234,241,1)')
    particle.image = Math.floor(Math.random()*stars.length);
    particle.opacity = 0.2 + Math.random()* 0.8;

    particles.push(particle);
  }
   
  function loop() {
    clear();
    update();
    draw();
    queue();
  }
   
  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
   
  function update() {
    
    // update particle position
    for(var i = 0; i < particles.length; i++) {
      particles[i].move(canvas.width, canvas.height);
    }

  }
   
  function draw() {

    for(var i = 0; i < particles.length; i++) { 

      var p1 = particles[i],
          p3 = mouse,
          star = stars[p1.image];

      // draw star
      /*ctx.beginPath();
      ctx.arc(p1.position.x, p1.position.y, p1.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = p1.color;
      ctx.fill();
      ctx.closePath();*/

      // draw image
      ctx.globalAlpha = p1.opacity;
      ctx.drawImage(star.image, 0, 0, star.width, star.height, p1.position.x-star.width/2, p1.position.y-star.height/2, star.width, star.height);
      ctx.restore();

      // check distance between any two particles
      for(var j = 0; j < particles.length; j++) {

        var p2 = particles[j];

        drawLink(p1, p2, distanceLink, 0.2);

      }

      drawLink(p1, p3, distanceLink, 1);

    }

  }
   
  function queue() {
    window.requestAnimationFrame(loop);
  }

  function drawLink(p1, p2, distance, opacity) {

    var dx = p1.position.x - p2.position.x,
        dy = p1.position.y - p2.position.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < distance && p1 !== p2) {
      ctx.beginPath();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(255,255,255,'+ (opacity / distance * (distance - dist)) +')';
      ctx.moveTo(p1.position.x, p1.position.y);
      ctx.lineTo(p2.position.x, p2.position.y);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();
    }
  }
   
  loop();

})(window);