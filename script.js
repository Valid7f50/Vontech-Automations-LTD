/* ── NAVBAR SCROLL ──────────────────────────────────── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });

    /* ── MOBILE MENU ────────────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    function closeMobile() {
      mobileMenu.classList.remove('open');
    }

    /* ── CIRCUIT ANIMATION (SVG) ────────────────────────── */
    (function drawCircuit() {
      const svg = document.getElementById('circuit-canvas');
      const W = 1200, H = 700;
      const nodes = [];
      for (let i = 0; i < 22; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H
        });
      }
      // Draw lines between nearby nodes
      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (j <= i) return;
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 220) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
            line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
            line.setAttribute('stroke', '#1E6FFF');
            line.setAttribute('stroke-width', '1');
            line.setAttribute('stroke-dasharray', d);
            line.setAttribute('stroke-dashoffset', d);
            const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            anim.setAttribute('attributeName', 'stroke-dashoffset');
            anim.setAttribute('from', d); anim.setAttribute('to', '0');
            anim.setAttribute('dur', (1 + Math.random() * 2) + 's');
            anim.setAttribute('begin', (Math.random() * 3) + 's');
            anim.setAttribute('fill', 'freeze');
            line.appendChild(anim);
            svg.appendChild(line);
          }
        });
      });
      // Draw dots at nodes
      nodes.forEach(n => {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', n.x); c.setAttribute('cy', n.y); c.setAttribute('r', '3');
        c.setAttribute('fill', '#1E6FFF');
        svg.appendChild(c);
      });
    })();

    /* ── CAROUSEL ───────────────────────────────────────── */
    (function initCarousel() {
      const track  = document.getElementById('carousel-track');
      const dotsEl = document.getElementById('carousel-dots');
      const slides = track.querySelectorAll('.carousel-slide');
      const total  = slides.length;
      let current  = 0;
      let timer;

      // Build dots
      slides.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(d);
      });

      function goTo(idx) {
        current = (idx + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsEl.querySelectorAll('.dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
        resetTimer();
      }

      function resetTimer() {
        clearInterval(timer);
        timer = setInterval(() => goTo(current + 1), 5000);
      }

      document.getElementById('prev-btn').addEventListener('click', () => goTo(current - 1));
      document.getElementById('next-btn').addEventListener('click', () => goTo(current + 1));

      // Swipe support
      let touchStartX = 0;
      track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
      track.addEventListener('touchend',   e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
      });

      resetTimer();
    })();

    /* ── SCROLL REVEAL ──────────────────────────────────── */
    (function initReveal() {
      const els = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      els.forEach(el => observer.observe(el));
    })();

    
    /* ── SET MIN DATE ON DATE INPUT ─────────────────────── */
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    /*Request sent alert*/
    function alertSuccess() {
      alert("Your request has been sent! We'll be in touch within 24 hours.");
    }