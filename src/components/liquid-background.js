import React, { useEffect, useRef } from 'react';

const LiquidBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {return;}

    const ctx = canvas.getContext('2d');

    // Set canvas size with mobile-friendly approach
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);

      // Ensure canvas covers the screen
      canvas.style.width = `${rect.width  }px`;
      canvas.style.height = `${rect.height  }px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Detect mobile devices for performance optimization (reserved for future use)
    // const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Enhanced liquid animation with modern aesthetics
    let time = 0;
    const animate = () => {
      try {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        // Create sophisticated black gradient background
        const bgGradient = ctx.createRadialGradient(
          canvas.width * 0.3,
          canvas.height * 0.3,
          0,
          canvas.width * 0.7,
          canvas.height * 0.7,
          canvas.width,
        );
        bgGradient.addColorStop(0, '#0a0a0a');
        bgGradient.addColorStop(0.4, '#121212');
        bgGradient.addColorStop(1, '#000000');

        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add multiple liquid orbs with black/dark gradients
        const orbs = [
          { color: [40, 40, 40], speed: 0.008, size: 1.2, offset: 0 }, // Dark Gray
          { color: [60, 60, 60], speed: 0.006, size: 1.0, offset: 2.1 }, // Medium Gray
          { color: [20, 20, 20], speed: 0.01, size: 0.8, offset: 4.2 }, // Very Dark Gray
          { color: [80, 80, 80], speed: 0.007, size: 1.1, offset: 1.4 }, // Light Gray
          { color: [30, 30, 30], speed: 0.009, size: 0.9, offset: 3.6 }, // Dark
        ];

        orbs.forEach(orb => {
          const baseX = canvas.width * (0.3 + 0.4 * Math.sin(time * orb.speed + orb.offset));
          const baseY = canvas.height * (0.3 + 0.4 * Math.cos(time * orb.speed * 0.8 + orb.offset));

          // Create multiple layers for depth
          for (let layer = 0; layer < 3; layer++) {
            const layerOffset = layer * 0.3;
            const x = baseX + Math.sin(time * orb.speed * 1.5 + orb.offset + layerOffset) * 80;
            const y = baseY + Math.cos(time * orb.speed * 1.2 + orb.offset + layerOffset) * 60;
            const radius =
              (120 + Math.sin(time * orb.speed * 2 + orb.offset) * 40) *
              orb.size *
              (1 - layer * 0.2);

            const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            const alpha =
              (0.15 - layer * 0.03) * (1 + Math.sin(time * orb.speed + orb.offset) * 0.3);

            orbGradient.addColorStop(0, `rgba(${orb.color.join(',')}, ${alpha})`);
            orbGradient.addColorStop(0.7, `rgba(${orb.color.join(',')}, ${alpha * 0.5})`);
            orbGradient.addColorStop(1, `rgba(${orb.color.join(',')}, 0)`);

            ctx.fillStyle = orbGradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Add subtle dark particle effect
        ctx.fillStyle = 'rgba(100, 100, 100, 0.01)';
        for (let particleIndex = 0; particleIndex < 50; particleIndex++) {
          const x = (canvas.width * (particleIndex / 50) + time * 0.5) % canvas.width;
          const y = canvas.height * 0.5 + Math.sin(time * 0.01 + particleIndex * 0.1) * 200;
          const size = 1 + Math.sin(time * 0.02 + particleIndex * 0.05) * 0.5;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        time += 0.8;
        requestAnimationFrame(animate);
      } catch (error) {
        // Fallback if canvas fails - just continue with static background
        console.warn('Canvas animation failed:', error);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        // Reliable dark background fallback
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)',
      }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default LiquidBackground;
