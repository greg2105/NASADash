import React, { useEffect, useRef } from 'react';

const StarrySky = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let numberOfStars = 325;
    let stars = [];
    let speed = 1; // Adjust this value to control the overall speed

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    class Star {
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = Math.random() * 2; // Adjust this value to control the star size
        this.vx = 0; // No horizontal velocity
        this.vy = speed / (Math.random() * 10 + 1); // Vertical velocity based on depth
        this.depth = Math.random() * 10 + 1; // Adjust this range to control the depth range
        this.context = ctx;
      }

      draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius / this.depth, 0, Math.PI * 2, false); // Adjust the radius based on depth
        this.context.closePath();
        this.context.fillStyle = '#FFF';
        this.context.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy * this.depth; // Adjust the vertical velocity based on depth
        // Wrap around the canvas when the star goes off-screen
        if (this.y > canvasHeight + this.radius) {
          this.y = -this.radius;
          this.x = Math.random() * canvasWidth;
          this.depth = Math.random() * 10 + 1; // Reset the depth when wrapping around
        }
      }
    }

    function setup() {
      for (let i = 0; i < numberOfStars; i++) {
        let star = new Star();
        stars.push(star);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.draw();
        star.update();
      }
      requestAnimationFrame(draw);
    }

    setup();
    draw();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="starry-sky-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default StarrySky;