import React, { useEffect, useRef } from 'react';

const PALETAS_FUEGOS = [
  ['#F6DC97', '#FFEAB0', '#E5B454', '#FFFDF5'], // Dorado champán
  ['#F6DC97', '#E24A59', '#FF8A95', '#FFF5E1'], // Carmesí Costa & oro
  ['#8ED8EE', '#F6DC97', '#CFEFF9', '#FFFFFF'], // Celeste Costa & oro
  ['#FFE08A', '#F3B64B', '#FFF9E6', '#D94150']  // Fiestas cálido
];

const randomBetween = (min, max) => min + Math.random() * (max - min);

const drawFourPointStar = (ctx, x, y, radius, alpha, color) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  const inner = radius * 0.28;
  for (let i = 0; i < 8; i += 1) {
    const angle = (i * Math.PI) / 4;
    const r = i % 2 === 0 ? radius : inner;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const FuegosArtificiales = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animationId = 0;
    let lastTime = performance.now();
    let launchCooldown = 650;
    let nextSide = 0; // 0 = izquierda, 1 = derecha

    const rockets = [];
    const particles = [];
    const flashes = [];
    let ambientStars = [];

    const pickTargetPoint = (side) => {
      const isDesktop = width >= 768;
      if (isDesktop) {
        // Colocar los fuegos artificiales a los costados del modal (540px centrado)
        const modalHalf = Math.min(285, width * 0.28);
        const center = width / 2;
        const margin = Math.max(36, width * 0.05);

        if (side === 0) {
          const maxLeft = Math.max(margin + 20, center - modalHalf - 28);
          return {
            x: randomBetween(margin, maxLeft),
            y: randomBetween(height * 0.14, height * 0.68)
          };
        }
        const minRight = Math.min(width - margin - 20, center + modalHalf + 28);
        return {
          x: randomBetween(minRight, width - margin),
          y: randomBetween(height * 0.14, height * 0.68)
        };
      }

      // En pantallas móviles, enmarcar las esquinas superiores e inferiores
      const x = side === 0 ? randomBetween(width * 0.08, width * 0.36) : randomBetween(width * 0.64, width * 0.92);
      const y = Math.random() < 0.72
        ? randomBetween(height * 0.05, height * 0.16)
        : randomBetween(height * 0.84, height * 0.94);
      return { x, y };
    };

    const generateAmbientStars = () => {
      const count = width >= 768 ? 38 : 18;
      const list = [];
      for (let i = 0; i < count; i += 1) {
        const side = i % 2;
        const pt = pickTargetPoint(side);
        list.push({
          x: pt.x,
          y: randomBetween(height * 0.06, height * 0.9),
          radius: randomBetween(2.2, 5.2),
          phase: randomBetween(0, Math.PI * 2),
          speed: randomBetween(1.1, 2.5),
          color: Math.random() < 0.72 ? '#F6DC97' : '#FFFDF5'
        });
      }
      ambientStars = list;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateAmbientStars();
    };

    const createBurst = (x, y) => {
      const palette = PALETAS_FUEGOS[Math.floor(Math.random() * PALETAS_FUEGOS.length)];
      const isDesktop = width >= 768;
      const outerCount = isDesktop ? 32 : 22;
      const innerCount = isDesktop ? 12 : 8;
      const baseSpeed = isDesktop ? randomBetween(2.6, 4.3) : randomBetween(1.9, 3.0);

      flashes.push({
        x,
        y,
        radius: isDesktop ? 64 : 44,
        alpha: 0.45,
        color: palette[0]
      });

      // Aro principal de chispas
      for (let i = 0; i < outerCount; i += 1) {
        const angle = (Math.PI * 2 * i) / outerCount + randomBetween(-0.08, 0.08);
        const speed = baseSpeed * randomBetween(0.75, 1.15);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          drag: randomBetween(0.955, 0.972),
          gravity: 0.036,
          alpha: 1,
          decay: randomBetween(0.011, 0.017),
          size: randomBetween(1.7, 2.8),
          color: palette[i % palette.length],
          isStar: i % 4 === 0,
          twinklePhase: randomBetween(0, Math.PI * 2),
          trail: [{ x, y }]
        });
      }

      // Corona interior dorada
      for (let i = 0; i < innerCount; i += 1) {
        const angle = (Math.PI * 2 * i) / innerCount + randomBetween(-0.12, 0.12);
        const speed = baseSpeed * randomBetween(0.35, 0.58);
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          drag: 0.96,
          gravity: 0.028,
          alpha: 1,
          decay: randomBetween(0.014, 0.021),
          size: randomBetween(1.4, 2.2),
          color: '#FFF6DC',
          isStar: true,
          twinklePhase: randomBetween(0, Math.PI * 2),
          trail: [{ x, y }]
        });
      }
    };

    const launchRocket = (side) => {
      const target = pickTargetPoint(side);
      const startX = target.x + randomBetween(-36, 36);
      const startY = Math.min(height + 10, target.y + randomBetween(160, 290));
      const durationFrames = randomBetween(24, 34);

      rockets.push({
        x: startX,
        y: startY,
        targetX: target.x,
        targetY: target.y,
        vx: (target.x - startX) / durationFrames,
        vy: (target.y - startY) / durationFrames,
        framesLeft: durationFrames,
        trail: [{ x: startX, y: startY }]
      });
    };

    resize();
    window.addEventListener('resize', resize);

    // En modo de movimiento reducido, dibujar estrellas y destellos estáticos elegantes
    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      ambientStars.forEach((star) => {
        drawFourPointStar(ctx, star.x, star.y, star.radius * 1.15, 0.6, star.color);
      });
      const leftPt = pickTargetPoint(0);
      const rightPt = pickTargetPoint(1);
      [leftPt, rightPt].forEach((pt) => {
        for (let i = 0; i < 16; i += 1) {
          const angle = (Math.PI * 2 * i) / 16;
          const dist = i % 2 === 0 ? 48 : 26;
          drawFourPointStar(
            ctx,
            pt.x + Math.cos(angle) * dist,
            pt.y + Math.sin(angle) * dist,
            i % 2 === 0 ? 4.5 : 3,
            0.55,
            i % 3 === 0 ? '#E24A59' : '#F6DC97'
          );
        }
      });

      return () => {
        window.removeEventListener('resize', resize);
      };
    }

    // Salva inicial inmediata a ambos costados para recibir al visitante
    const initialLeft = pickTargetPoint(0);
    const initialRight = pickTargetPoint(1);
    createBurst(initialLeft.x, initialLeft.y);
    const secondBurstTimer = window.setTimeout(() => {
      createBurst(initialRight.x, initialRight.y);
    }, 260);

    const render = (now) => {
      const dt = Math.min(34, now - lastTime);
      const step = dt / 16.67;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // 1. Estrellas titilantes de fondo a los costados
      const timeSec = now * 0.001;
      for (let i = 0; i < ambientStars.length; i += 1) {
        const s = ambientStars[i];
        const alpha = 0.2 + 0.55 * (0.5 + 0.5 * Math.sin(timeSec * s.speed + s.phase));
        drawFourPointStar(ctx, s.x, s.y, s.radius, alpha, s.color);
      }

      // 2. Lanzar nuevos fuegos artificiales alternando izquierda y derecha
      launchCooldown -= dt;
      if (launchCooldown <= 0 && rockets.length < 3) {
        launchRocket(nextSide);
        nextSide = nextSide === 0 ? 1 : 0;
        launchCooldown = width >= 768 ? randomBetween(850, 1450) : randomBetween(1300, 2100);
      }

      // 3. Actualizar y dibujar cohetes ascendentes
      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i];
        r.x += r.vx * step;
        r.y += r.vy * step;
        r.framesLeft -= step;
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();

        ctx.save();
        ctx.lineCap = 'round';
        for (let t = 1; t < r.trail.length; t += 1) {
          const prev = r.trail[t - 1];
          const curr = r.trail[t];
          ctx.strokeStyle = `rgba(246, 220, 151, ${(t / r.trail.length) * 0.7})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();
        }
        ctx.fillStyle = '#FFFDF5';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (r.framesLeft <= 0) {
          createBurst(r.targetX, r.targetY);
          rockets.splice(i, 1);
        }
      }

      // 4. Resplandores suaves en el punto de explosión
      for (let i = flashes.length - 1; i >= 0; i -= 1) {
        const f = flashes[i];
        f.alpha -= 0.022 * step;
        if (f.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }
        ctx.save();
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, f.color);
        grad.addColorStop(1, 'rgba(246, 220, 151, 0)');
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Partículas de fuegos artificiales con estelas y estrellas
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        const dragFactor = Math.pow(p.drag, step);
        p.vx *= dragFactor;
        p.vy = p.vy * dragFactor + p.gravity * step;
        p.x += p.vx * step;
        p.y += p.vy * step;
        p.alpha -= p.decay * step;

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        if (p.alpha <= 0.02) {
          particles.splice(i, 1);
          continue;
        }

        const flicker = 0.75 + 0.25 * Math.sin(timeSec * 14 + p.twinklePhase);
        const finalAlpha = Math.max(0, Math.min(1, p.alpha * flicker));

        // Estela luminosa
        ctx.save();
        ctx.lineCap = 'round';
        ctx.strokeStyle = p.color;
        for (let t = 1; t < p.trail.length; t += 1) {
          const prev = p.trail[t - 1];
          const curr = p.trail[t];
          ctx.globalAlpha = finalAlpha * (t / p.trail.length) * 0.55;
          ctx.lineWidth = p.size * (t / p.trail.length);
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();
        }
        ctx.restore();

        if (p.isStar) {
          drawFourPointStar(ctx, p.x, p.y, p.size * 2.1, finalAlpha, p.color);
        } else {
          ctx.save();
          ctx.globalAlpha = finalAlpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationId = window.requestAnimationFrame(render);
    };

    animationId = window.requestAnimationFrame(render);

    return () => {
      window.clearTimeout(secondBurstTimer);
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default FuegosArtificiales;
