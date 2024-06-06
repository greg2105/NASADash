import React, { useRef, useEffect } from 'react';

const StarBackground = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate star positions
    const positions = [];
    for (let i = 0; i < 5000; i++) {
      positions.push(
        Math.random() * 2 - 1, // x position between -1 and 1
        Math.random() * 2 - 1, // y position between -1 and 1
        Math.random() * 2 - 1  // z position between -1 and 1
      );
    }

    // Draw stars
    ctx.fillStyle = '#fff';
    for (let i = 0; i < positions.length; i += 3) {
      const x = (positions[i] + 1) * canvas.width / 2;
      const y = (positions[i + 1] + 1) * canvas.height / 2;
      ctx.fillRect(x, y, 2, 2);
    }

    // Add animation if needed
    const animate = () => {
      // Update star positions and redraw
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default StarBackground;