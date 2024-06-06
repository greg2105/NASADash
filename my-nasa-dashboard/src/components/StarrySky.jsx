import React, { useEffect, useRef } from 'react';

const StarrySky = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mainContext = canvas.getContext('2d');

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let centerX = canvasWidth * 0.5;
    let centerY = canvasHeight * 0.5;

    let numberOfStars = 500;
    let stars = [];

    let frames_per_second = 60;
    let interval = Math.floor(1000 / frames_per_second);
    let startTime = performance.now();
    let previousTime = startTime;

    let currentTime = 0;
    let deltaTime = 0;

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function remap(value, start1, stop1, start2, stop2) {
      return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    }

    class Star {
      constructor() {
        this.x = getRandomInt(-centerX, centerX);
        this.y = getRandomInt(-centerY, centerY);
        this.counter = getRandomInt(1, canvasWidth);

        this.radiusMax = 1 + Math.random() * 10;
        this.speed = getRandomInt(1, 5);

        this.context = mainContext;
      }

      drawStar() {
        this.counter -= this.speed;

        if (this.counter < 1) {
          this.counter = canvasWidth;
          this.x = getRandomInt(-centerX, centerX);
          this.y = getRandomInt(-centerY, centerY);

          this.radiusMax = getRandomInt(1, 10);
          this.speed = getRandomInt(1, 5);
        }

        let xRatio = this.x / this.counter;
        let yRatio = this.y / this.counter;

        let starX = remap(xRatio, 0, 1, 0, canvasWidth);
        let starY = remap(yRatio, 0, 1, 0, canvasHeight);

        this.radius = remap(this.counter, 0, canvasWidth, this.radiusMax, 0);

        mainContext.beginPath();
        mainContext.arc(starX, starY, this.radius, 0, Math.PI * 2, false);
        mainContext.closePath();

        mainContext.fillStyle = "#FFF";
        mainContext.fill();
      }
    }

    function setup() {
      for (let i = 0; i < numberOfStars; i++) {
        let star = new Star();
        stars.push(star);
      }
    }

    function draw(timestamp) {
      currentTime = timestamp;
      deltaTime = currentTime - previousTime;

      if (deltaTime > interval) {
        previousTime = currentTime - (deltaTime % interval);

        mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
        mainContext.fillStyle = "#111";
        mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

        mainContext.translate(centerX, centerY);

        for (let i = 0; i < stars.length; i++) {
          let star = stars[i];
          star.drawStar();
        }

        mainContext.translate(-centerX, -centerY);
      }

      requestAnimationFrame(draw);
    }

    setup();
    draw();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default StarrySky;