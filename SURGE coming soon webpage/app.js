// ==========================================
// SURGE Grooming - Coming Soon Webpage JS
// ==========================================

const PRODUCTS_PREVIEW = [
  {
    id: "sea_salt_spray",
    name: "SURGE Sea Salt Spray",
    category: "Beachy texture, zero effort.",
    shortDescription: "Problem: Flat, limp hair with zero texture. What's in it: Real sea salt for grip, aloe & glycerin. What it does: Undone beachy texture.",
    image: "assets/images/sea_salt_spray.webp",
    price: 1199,
    hold: "Medium Grip",
    shine: "Zero Shine Matte"
  },
  {
    id: "texture_powder",
    name: "SURGE Texture Powder",
    category: "Root lift that actually holds.",
    shortDescription: "Problem: Flat roots & no hold. What's in it: Starch that absorbs oil, no white cast. What it does: Instant matte root lift.",
    image: "assets/images/texture_powder.webp",
    price: 1099,
    hold: "High Lift",
    shine: "Ultra Matte"
  },
  {
    id: "pomade",
    name: "SURGE Pomade",
    category: "Hold and shine, your rules.",
    shortDescription: "Problem: Needing hold without greasy build-up. What's in it: Waxes. What it does: Slicked or texturized, clean shine.",
    image: "assets/images/pomade.webp",
    price: 1299,
    hold: "Strong Hold",
    shine: "Clean Gloss"
  },
  {
    id: "clay",
    name: "SURGE Clay",
    category: "Strong hold, zero shine.",
    shortDescription: "Problem: Frizz & flyaways. What's in it: Oil-absorbing clay that keeps you matte. What it does: Strong hold, matte finish.",
    image: "assets/images/hair_clay.webp",
    price: 1199,
    hold: "Firm Lock",
    shine: "Zero Shine Matte"
  },
  {
    id: "volumizing_mousse",
    name: "SURGE Hair Styling Mousse",
    category: "Volume that moves.",
    shortDescription: "Problem: Fine or thin hair that goes flat. What's in it: Light foam without stiffness or flakes. What it does: Natural volume.",
    image: "assets/images/styling_mousse.webp",
    price: 1199,
    hold: "Flexible Body",
    shine: "Natural"
  },
  {
    id: "leave_in_conditioner",
    name: "SURGE Leave-in Conditioner",
    category: "Softer hair, no rinse.",
    shortDescription: "Problem: Dry, frizzy hair between washes. What's in it: Moisture & protein mix. What it does: Soft, easy, lightweight hair.",
    image: "assets/images/leave_in_conditioner.webp",
    price: 1299,
    hold: "Flexible",
    shine: "Natural Matte"
  },
  {
    id: "hair_oil",
    name: "SURGE Hair Oil",
    category: "Shine without the grease.",
    shortDescription: "Problem: Dryness & split ends. What's in it: Lightweight fast-absorbing oil blend. What it does: Shine, control, zero grease residue.",
    image: "assets/images/hairstyling_oil.webp",
    price: 1499,
    hold: "Light Control",
    shine: "Healthy Shine"
  }
];

// Preload all product WebP images into browser memory immediately on startup
PRODUCTS_PREVIEW.forEach(p => {
  const img = new Image();
  img.src = p.image;
});

// Lenis smooth scroll instance
let lenis = null;

// Quiz modal state variables
let currentQuizStep = 1;
const quizAnswers = {};
let recommendedRoutineName = "";

document.addEventListener("DOMContentLoaded", () => {
  // Force browser scroll restoration to top of page on reload/refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  initSplashPreloader();
  setupHeroLiquid();
  setupStoryBottleSection();
  renderProductsProgressive();
  initQuizModal();
  initScrambled3DCardPile();
  setupVIPForm();
});

// ==========================================
// 1. Cinematic Preloader Splash Animation (E-Commerce Style slide-up reveal)
// ==========================================
function initSplashPreloader() {
  const splashScreen = document.getElementById("splash-screen");

  // Non-blocking background loading: initialize Lenis & layout calculations in parallel while splash plays
  initLenisScroll();

  // Entrance splash animation timing (splits screen up after 3.2 seconds display for luxury cinematic feel)
  setTimeout(() => {
    if (splashScreen) {
      splashScreen.classList.add("splash-slide-up");
    }
    
    setupScrollReveal();
    triggerHeroReveal();
    
    setTimeout(() => {
      if (splashScreen) {
        splashScreen.style.display = "none";
      }
      // Force dimensions recalculation and layout refresh for canvas and ScrollTriggers on mobile
      window.dispatchEvent(new Event('resize'));
      ScrollTrigger.refresh();
    }, 800);
  }, 3200);
}

function triggerHeroReveal() {
  anime({
    targets: '.cs-header',
    opacity: [0, 1],
    translateY: [-10, 0],
    easing: 'easeOutQuad',
    duration: 600
  });

  anime({
    targets: '.cs-hero-intro-container .reveal-item, .cs-hero-intro-container > *',
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(150),
    easing: 'easeOutQuad',
    duration: 800
  });
}

// ==========================================
// 2. 2D Magnetic Grid Dot Image Reveal Hero Background (React Port from E-Commerce)
// ==========================================
function setupHeroLiquid() {
  const container = document.getElementById("home-hero-container");
  const canvas = document.getElementById("hero-liquid-canvas");
  if (!container || !canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dotsCount = 54; // dense luxurious dot grid spacing
  const gap = 3;
  const intensity = 8;
  const radius = 300; // Focused 300px spotlight radius
  const background = "#000000"; // Solid black base background
  const dotColor = "rgba(255, 255, 255, 0.08)";

  const mouse = { x: -99999, y: -99999, active: false };
  let isHeroVisible = true;
  let isLoopRunning = false;
  let cachedRect = null;

  class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.reveal = 0;
      this.treveal = 0;
      this.lastHit = 0;
    }

    update(mx, my, active, r, falloff, now) {
      if (active) {
        this.lastHit = now;
        const dist = Math.hypot(mx - this.x, my - this.y);
        const n = Math.max(0, Math.min(1, 1 - dist / r));
        const shaped = Math.pow(n, falloff);
        this.treveal = shaped * shaped * (3 - 2 * shaped);
      } else if (now - this.lastHit > 50) {
        this.treveal = 0;
      }
      this.reveal += (this.treveal - this.reveal) * 0.12;
      return this.reveal > 0.001;
    }
  }

  const img = new Image();
  img.onload = () => {
    computeFit();
  };
  img.src = "assets/images/IMG_4020.webp";

  let W = 1;
  let H = 1;
  let pitch = 20;
  let dotSize = 20;
  let fullSize = 20;
  let fitInfo = null;
  let bleed = 0;
  let cells = [];

  const computeFit = () => {
    if (!img || !img.complete || !img.naturalWidth) {
      fitInfo = null;
      return;
    }
    const nW = img.naturalWidth;
    const nH = img.naturalHeight;
    const fit = Math.max(W / nW, H / nH); // Cover proportions to fill the container completely
    fitInfo = {
      fit,
      dx: (W - nW * fit) / 2,
      dy: 0, // Align top of scaled image to top of section (bottle caps fully visible!)
    };
  };

  const build = (mw, mh) => {
    cachedRect = container.getBoundingClientRect();
    W = Math.max(1, Math.floor(mw ?? cachedRect.width));
    H = Math.max(1, Math.floor(mh ?? cachedRect.height));

    pitch = W / dotsCount;
    dotSize = Math.max(1, pitch - Math.max(0, gap));
    fullSize = pitch * 1.6;
    const rowN = Math.max(1, Math.ceil(H / pitch));

    bleed = Math.ceil(fullSize / 2 + 4);

    const dpr = window.devicePixelRatio || 1;
    const cw = W + bleed * 2;
    const ch = H + bleed * 2;
    canvas.width = Math.floor(cw * dpr);
    canvas.height = Math.floor(ch * dpr);
    canvas.style.width = cw + "px";
    canvas.style.height = ch + "px";
    canvas.style.left = -bleed + "px";
    canvas.style.top = -bleed + "px";
    ctx.setTransform(dpr, 0, 0, dpr, bleed * dpr, bleed * dpr);

    const gridH = rowN * pitch;
    const oy = (H - gridH) / 2 + pitch / 2;

    cells = [];
    for (let c = 0; c < dotsCount; c++) {
      for (let rIdx = 0; rIdx < rowN; rIdx++) {
        cells.push(new Cell(c * pitch + pitch / 2, oy + rIdx * pitch));
      }
    }
    computeFit();
  };

  const I = Math.max(1, Math.min(10, intensity));
  const falloff = Math.pow(2, (0.5 - ((I - 1) * 5) / 9) / 1.5);

  const drawFrame = (now) => {
    ctx.clearRect(-bleed, -bleed, W + bleed * 2, H + bleed * 2);

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    
    const currentRadius = W < 768 ? 160 : radius; // Responsive radius for mobile touchscreens
    let hasVisibleCells = false;
    for (const cell of cells) {
      const activeCell = cell.update(mouse.x, mouse.y, mouse.active, currentRadius, falloff, now);
      const d = fullSize * cell.reveal;
      if (d > 0.05) {
        hasVisibleCells = true;
        ctx.moveTo(cell.x + d / 2, cell.y);
        ctx.arc(cell.x, cell.y, d / 2, 0, 2 * Math.PI);
      } else if (activeCell) {
        hasVisibleCells = true;
      }
    }
    if (hasVisibleCells) {
      ctx.fill();
    }

    if (hasVisibleCells && img && img.complete && img.naturalWidth > 0 && fitInfo) {
      ctx.globalCompositeOperation = "source-in";
      const nW = img.naturalWidth;
      const nH = img.naturalHeight;
      ctx.drawImage(img, fitInfo.dx, fitInfo.dy, nW * fitInfo.fit, nH * fitInfo.fit);
    }

    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = background;
    ctx.fillRect(-bleed, -bleed, W + bleed * 2, H + bleed * 2);

    ctx.globalCompositeOperation = "source-over";
    return hasVisibleCells;
  };

  build();

  const setMouse = (clientX, clientY) => {
    if (!cachedRect) cachedRect = container.getBoundingClientRect();
    mouse.x = clientX - cachedRect.left;
    mouse.y = clientY - cachedRect.top;
    mouse.active = true;
    startLoop();
  };

  const onLeave = () => {
    mouse.active = false;
    mouse.x = -99999;
    mouse.y = -99999;
  };

  container.addEventListener("mousemove", (e) => setMouse(e.clientX, e.clientY));
  container.addEventListener("mouseleave", onLeave);
  container.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    if (t) setMouse(t.clientX, t.clientY);
  }, { passive: true });
  container.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (t) setMouse(t.clientX, t.clientY);
  }, { passive: true });
  container.addEventListener("touchend", onLeave, { passive: true });

  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (entry && entry.contentRect) {
      build(entry.contentRect.width, entry.contentRect.height);
    }
  });
  resizeObserver.observe(container);

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 768);
  if (isTouchDevice) {
    // On mobile, render static hero background image with black glass overlay
    return;
  }

  // IntersectionObserver to pause RAF loop when hero section is not visible in viewport
  const heroIO = new IntersectionObserver((entries) => {
    isHeroVisible = entries[0].isIntersecting;
    if (isHeroVisible) {
      startLoop();
    }
  }, { threshold: 0.05 });
  heroIO.observe(container);

  let rafId = 0;
  function startLoop() {
    if (!isLoopRunning && isHeroVisible) {
      isLoopRunning = true;
      rafId = requestAnimationFrame(loop);
    }
  }

  function loop(now) {
    if (!isHeroVisible) {
      isLoopRunning = false;
      return;
    }

    const isRevealing = drawFrame(now);
    if (mouse.active || isRevealing) {
      rafId = requestAnimationFrame(loop);
    } else {
      isLoopRunning = false;
    }
  }
  startLoop();
}

// ==========================================
// 3. Lenis Smooth Scroll & GSAP ScrollTrigger Integration
// ==========================================
function initLenisScroll() {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lenis Smooth Scroll
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    orientation: 'vertical',
    gestureOrientation: 'vertical'
  });

  // Force Lenis to start at coordinates (0, 0) immediately
  lenis.scrollTo(0, { immediate: true });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update);

  // Set up GSAP Scrub timeline for 240-frame bottle rotation (linked to scroll of showcase column)
  const bottleObj = { frame: 0 };
  const isMobile = window.innerWidth < 768;

  const rotationTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#showcase",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1, // Smooth scrub tracking
      onUpdate: (self) => {
        // Update SVG circular progress ring stroke offset
        const progressRing = document.getElementById("hub-progress-ring");
        if (progressRing) {
          const circumference = 295.3;
          progressRing.style.strokeDashoffset = circumference - (self.progress * circumference);
        }
        // Sync constellation nodes on desktop
        if (!isMobile) {
          updateConstellationNodes(self.progress);
        }
      }
    }
  });

  // Mobile natural scrolling per-card focus, wide reading opacity, photo sync, and circular arc curve
  if (isMobile) {
    const cards = document.querySelectorAll(".cs-fact-card-scroll");
    const progressRing = document.getElementById("hub-progress-ring");
    const totalCards = cards.length;

    cards.forEach((card, index) => {
      // Set initial state for card 0 as active
      if (index === 0) card.classList.add("active-card");

      ScrollTrigger.create({
        trigger: card,
        start: "top 90%",
        end: "bottom 10%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress; // 0 to 1 as card passes through viewport
          const diff = p - 0.5; // -0.5 to 0.5

          // Distinct circular arc rotation & curvature along the left circle
          const rot = diff * -35; // Circular arc tilt
          const tx = (1 - Math.cos(diff * Math.PI)) * -20; // Arc curvature offset

          // Opacity rule: stays 100% visible (opacity: 1) from p=0.20 to p=0.80 (wide reading zone!)
          let opacity = 1;
          if (p < 0.20) {
            opacity = p / 0.20; // Fade in from 0 to 1
          } else if (p > 0.80) {
            opacity = (1 - p) / 0.20; // Fade out from 1 to 0
          }

          gsap.set(card, {
            rotation: rot,
            x: tx,
            opacity: opacity,
            transformOrigin: "left center"
          });

          // Focus window & photo sync in middle range (p from 0.25 to 0.75)
          if (p > 0.25 && p < 0.75) {
            cards.forEach((c, i) => {
              if (i === index) c.classList.add("active-card");
              else c.classList.remove("active-card");
            });

            // Highlight corresponding orbit node on left
            const nodes = document.querySelectorAll(".constellation-node");
            nodes.forEach(n => {
              const nIdx = parseInt(n.getAttribute("data-index"));
              if (nIdx === index + 1) {
                n.classList.add("active");
              } else {
                n.classList.remove("active");
              }
            });

            const activeProduct = PRODUCTS_PREVIEW[index];
            if (activeProduct) {
              const centerImg = document.getElementById("constellation-center-img");
              if (centerImg && centerImg.getAttribute("src") !== activeProduct.image) {
                centerImg.setAttribute("src", activeProduct.image);
              }
            }
            if (progressRing) {
              const circumference = 295.3;
              const cardStepProgress = (index + Math.min(1, Math.max(0, (p - 0.25) / 0.5))) / totalCards;
              progressRing.style.strokeDashoffset = circumference - (cardStepProgress * circumference);
            }
          }
        }
      });
    });
  }

  // Initialize constellation interactive overlay
  initConstellation();

  // Set up Scroll-driven Curved Arcs for the product description cards on the right column
  const cards = document.querySelectorAll(".cs-fact-card-scroll");
  cards.forEach((card) => {
    gsap.fromTo(card, 
      { x: 90, rotation: 8, opacity: 0.1 },
      {
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        ease: "none",
        keyframes: [
          { x: 90, rotation: 8, opacity: 0.1, duration: 0 },
          { x: 0, rotation: 0, opacity: 1, duration: 0.5 },
          { x: 90, rotation: -8, opacity: 0.1, duration: 0.5 }
        ]
      }
    );
  });
}

// ==========================================
// 4b. Interactive Constellation & Orbit Shuffler Sync
// ==========================================
function initConstellation() {
  const nodesContainer = document.getElementById("constellation-nodes");
  const nodes = document.querySelectorAll(".constellation-node");
  if (!nodesContainer || nodes.length === 0) return;

  // Handle click on nodes: scroll to corresponding right card
  nodes.forEach(node => {
    node.addEventListener("click", () => {
      const idx = parseInt(node.getAttribute("data-index"));
      const targetCard = document.getElementById(`scroll-fact-${idx}`);
      if (targetCard && lenis) {
        // Smooth scroll directly to center (0 offset for 100vh cards)
        lenis.scrollTo(targetCard, { offset: 0, duration: 1.2 });
      }
    });
  });

  // Position nodes initially
  updateConstellationNodes(0);
}

function updateConstellationNodes(progress) {
  const nodes = document.querySelectorAll(".constellation-node");
  if (nodes.length === 0) return;

  const currentRotation = -progress * 360;
  
  // Calculate active index (1 to 7) based on scroll progress
  const activeIndex = Math.min(7, Math.max(1, Math.round(progress * 6) + 1));
  const nodesContainer = document.getElementById("constellation-nodes");
  if (nodesContainer) {
    // Pure rotation around center (no translate offset to prevent coordinate shifting)
    nodesContainer.style.transform = `rotate(${currentRotation}deg)`;
  }

  // Calculate dynamic responsive center and radius based on container size
  // Uses offsetWidth (fixed layout size) instead of getBoundingClientRect() (which fluctuates with rotation transforms)
  let center = 200;
  let radius = 160; // Slightly larger radius to clear the enlarged 170px center hub
  if (nodesContainer) {
    const width = nodesContainer.offsetWidth;
    if (width > 0) {
      center = width / 2.0;
      radius = width * 0.38; // Constant, stable proportion regardless of rotation!
    }
  }

  nodes.forEach(node => {
    const idx = parseInt(node.getAttribute("data-index"));
    const baseAngle = parseFloat(node.style.getPropertyValue("--angle") || 0);
    const isActive = (idx === activeIndex);

    // Apply active highlight
    if (isActive) {
      if (!node.classList.contains("active")) {
        node.classList.add("active");
        playShuffleAnimation(node);
      }
    } else {
      node.classList.remove("active");
    }

    // Update connecting lines in SVG constellation (viewBox is always 400x400, center is 200)
    const line = document.getElementById(`connect-line-${idx}`);
    if (line) {
      if (isActive) {
        line.classList.add("active");
        // Calculate coordinates relative to SVG viewBox center (200, 200)
        const rad = (baseAngle + currentRotation) * Math.PI / 180;
        const x2 = 200 + 140 * Math.cos(rad);
        const y2 = 200 + 140 * Math.sin(rad);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
      } else {
        line.classList.remove("active");
        line.setAttribute("x2", 200);
        line.setAttribute("y2", 200);
      }
    }
    
    // Position node on circular path with counter-rotation and responsive local radius
    const rad = baseAngle * Math.PI / 180;
    const x = center + radius * Math.cos(rad);
    const y = center + radius * Math.sin(rad);
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.transform = `translate(-50%, -50%) rotate(${-currentRotation}deg) scale(${isActive ? 1.25 : 1.0})`;
  });

  // Update center hub image with dynamic scroll-driven zoom and cross-fade
  const activeProduct = PRODUCTS_PREVIEW[activeIndex - 1];
  if (activeProduct) {
    const centerImg = document.getElementById("constellation-center-img");
    if (centerImg) {
      // Calculate normalized progress within the active step (0 to 1)
      const stepProgress = (progress * 6) % 1;
      
      // Calculate smooth breathing zoom (scale ranges between 1.0 and 1.2)
      const zoomScale = 1.0 + Math.sin(stepProgress * Math.PI) * 0.2;
      
      // Apply styles dynamically for responsive zoom transitions (always 100% opaque)
      centerImg.style.transform = `scale(${zoomScale})`;
      centerImg.style.opacity = "1";

      if (centerImg.getAttribute("src") !== activeProduct.image) {
        centerImg.setAttribute("src", activeProduct.image);
      }
    }
  }
}

function playShuffleAnimation(node) {
  const idx = node.getAttribute("data-index");
  const card = document.getElementById(`scroll-fact-${idx}`);
  if (card) {
    // Shuffling slide out/in animation using GSAP for responsive physics
    gsap.fromTo(card, 
      { x: -35, opacity: 0.3, filter: "blur(4px)" },
      { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "power2.out" }
    );
  }
}

// ==========================================
// 5. Product Grid Rendering (with Blur-to-Clear Reveal)
// ==========================================
function renderProductsProgressive() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = "";
  PRODUCTS_PREVIEW.forEach(p => {
    const card = document.createElement("div");
    card.className = "cs-prod-card";
    card.innerHTML = `
      <div class="cs-prod-img-wrap">
        <img src="${p.image}" alt="${p.name}" class="cs-prod-img" loading="eager" decoding="async">
        <div class="cs-ios-popover" onclick="openNotifyModal('${p.name}')">
          <span>Remind Me</span> &rarr;
        </div>
      </div>
      <span class="cs-prod-badge">LAUNCH PREVIEW</span>
      <h3 class="cs-prod-name">${p.name}</h3>
      <p class="cs-prod-desc">${p.category}</p>
      <div class="cs-prod-meters">
        <span>Hold: <strong>${p.hold}</strong></span>
        <span>Finish: <strong>${p.shine}</strong></span>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ==========================================
// 6. VIP Form Registration (15% OFF / 20% OFF Waitlist)
// ==========================================
function setupVIPForm() {
  const form = document.getElementById("vip-form");
  const successCard = document.getElementById("vip-success-msg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("vip-email").value;
    if (email) {
      form.style.display = "none";
      successCard.style.display = "block";
      
      // If they had a routine recommended, save it
      if (recommendedRoutineName) {
        localStorage.setItem("surge_cs_routine", recommendedRoutineName);
      }
      localStorage.setItem("surge_cs_vip", email);
    }
  });
}

// ==========================================
// 7. E-Commerce Quiz Modal controllers (re-linked to waitlist)
// ==========================================
function initQuizModal() {
  const startBtn = document.getElementById("quiz-start-btn");
  const footerStartBtn = document.getElementById("footer-quiz-start-btn");
  const modal = document.getElementById("quiz-modal");
  const closeBtn = document.getElementById("quiz-close-btn");
  const overlay = document.getElementById("quiz-modal-overlay");

  if (!modal) return;

  const openQuiz = () => {
    modal.classList.add("active");
    showQuizStep(1);
  };

  startBtn?.addEventListener("click", openQuiz);
  footerStartBtn?.addEventListener("click", openQuiz);

  const hideQuiz = () => modal.classList.remove("active");
  closeBtn?.addEventListener("click", hideQuiz);
  overlay?.addEventListener("click", hideQuiz);

  // Navigate back buttons
  document.querySelectorAll(".quiz-back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentQuizStep > 1) {
        showQuizStep(currentQuizStep - 1);
      }
    });
  });

  // Options selections
  document.querySelectorAll(".quiz-step").forEach(stepContainer => {
    const stepNum = parseInt(stepContainer.getAttribute("data-step"), 10);
    if (isNaN(stepNum)) return;

    stepContainer.addEventListener("click", (e) => {
      const optionBtn = e.target.closest(".quiz-option");
      if (!optionBtn) return;

      const ansVal = optionBtn.getAttribute("data-ans");
      quizAnswers[stepNum] = ansVal;

      stepContainer.querySelectorAll(".quiz-option").forEach(b => b.classList.remove("selected"));
      optionBtn.classList.add("selected");

      setTimeout(() => {
        if (stepNum < 4) {
          showQuizStep(stepNum + 1);
        } else {
          showQuizStep("results");
        }
      }, 250);
    });
  });

  // Apply recommended routine: scroll to waitlist signup
  document.getElementById("quiz-apply-routine-btn")?.addEventListener("click", () => {
    modal.classList.remove("active");
    alert(`We've selected ${recommendedRoutineName || 'your routine'} for your reservation! Enter your email below to reserve your priority access.`);
    lenis?.scrollTo("#vip-signup", { duration: 0.8 });
    document.getElementById("vip-email")?.focus();
  });
}

function showQuizStep(step) {
  currentQuizStep = step;
  const steps = document.querySelectorAll(".quiz-step");
  steps.forEach(container => {
    container.classList.remove("active");
    if (container.getAttribute("data-step") === step.toString()) {
      container.classList.add("active");
      const fill = container.querySelector(".progress-fill");
      const stepNum = parseInt(step, 10);
      if (fill && !isNaN(stepNum)) {
        fill.style.transform = `scaleX(${stepNum / 4})`;
      }
    }
  });

  const resultContainer = document.getElementById("quiz-step-result");
  if (step === "results") {
    resultContainer.classList.add("active");
    calculateQuizRecommendations();
  } else {
    resultContainer.classList.remove("active");
  }
}

function calculateQuizRecommendations() {
  const type = quizAnswers[1];
  const styling = quizAnswers[2];
  const length = quizAnswers[3];
  const concern = quizAnswers[4];

  let recommendationName = "The Essential Set";
  let recommendedIds = [];
  let explanationText = "";

  if (styling === "matte-volume") {
    recommendationName = "The Volumizing Matte Duo";
    recommendedIds = ["texture_powder", "sea_salt_spray"];
    explanationText = "Based on your styling selection, we recommend styling with a combination of our Sea Salt Spray for wave grip and the Texture Powder for gravity-defying root lift.";
  } else if (concern === "dry-frizz") {
    recommendationName = "The Hydration & Control Set";
    recommendedIds = ["leave_in_conditioner", "hair_oil"];
    explanationText = "To target dryness and coarse textures, style with our nourishing Leave-in Conditioner and seal in a healthy gloss with Hair Oil.";
  } else if (styling === "sleek-shine") {
    recommendationName = "The Classic Sleek Routine";
    recommendedIds = ["pomade", "leave_in_conditioner"];
    explanationText = "For neat parts and sharp holds with a refined high-shine gloss, use our water-soluble Pomade and lock hydration in with Leave-in Conditioner.";
  } else {
    // Default fallback
    recommendationName = "The Daily Texturizing Routine";
    recommendedIds = ["texture_powder", "sea_salt_spray"];
    explanationText = "Our classic dynamic duo: Sea Salt Spray for instant salt grip texture, followed by Texture Powder at the roots for all-day matte lift.";
  }

  recommendedRoutineName = recommendationName;

  const routineNameLabel = document.getElementById("quiz-routine-name");
  const explanationLabel = document.getElementById("quiz-recommendation-explanation");
  const thumbsContainer = document.getElementById("quiz-recommended-products-container");

  if (routineNameLabel) routineNameLabel.textContent = recommendationName;
  if (explanationLabel) explanationLabel.textContent = explanationText;

  if (thumbsContainer) {
    thumbsContainer.innerHTML = "";
    recommendedIds.forEach(id => {
      const product = PRODUCTS_PREVIEW.find(p => p.id === id);
      if (product) {
        const thumb = document.createElement("div");
        thumb.className = "quiz-recommend-thumb";
        thumb.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
        thumbsContainer.appendChild(thumb);
      }
    });
  }
}

// ==========================================
// 8. Scrambled 3D Card Parallax Tilt Pile (Chronicles)
// ==========================================
function initScrambled3DCardPile() {
  const cards = document.querySelectorAll(".scrambled-card");
  
  // Default scrambled angles and translations mapping to match style.css
  const scrambledDefaults = {
    "1": { rot: -5, y: 12 },
    "2": { rot: 3,  y: -8 },
    "3": { rot: -2, y: 4 },
    "4": { rot: 6,  y: -15 }
  };

  cards.forEach(card => {
    const idx = card.getAttribute("data-index");
    const defaults = scrambledDefaults[idx] || { rot: 0, y: 0 };

    // Lerp state variables
    let targetRotX = 0;
    let targetRotY = 0;
    let targetScale = 1.0;
    let targetTranslateY = defaults.y;

    let currentRotX = 0;
    let currentRotY = 0;
    let currentScale = 1.0;
    let currentTranslateY = defaults.y;

    let isHovered = false;
    let isCardAnimating = false;
    let cachedCardRect = null;

    function startCardLoop() {
      if (!isCardAnimating) {
        isCardAnimating = true;
        requestAnimationFrame(updateCardTransform);
      }
    }

    card.addEventListener("mouseenter", () => {
      cachedCardRect = card.getBoundingClientRect();
      isHovered = true;
      startCardLoop();
    });

    card.addEventListener("mousemove", (e) => {
      if (!cachedCardRect) cachedCardRect = card.getBoundingClientRect();
      const x = e.clientX - cachedCardRect.left - (cachedCardRect.width / 2);
      const y = e.clientY - cachedCardRect.top - (cachedCardRect.height / 2);

      const maxTilt = 24;
      targetRotX = -(y / (cachedCardRect.height / 2)) * maxTilt;
      targetRotY = (x / (cachedCardRect.width / 2)) * maxTilt;
      targetScale = 1.12; // Noticeable card pop scale
      targetTranslateY = defaults.y - 25; // Smooth lift up from desk
      startCardLoop();
    });

    card.addEventListener("mouseleave", () => {
      isHovered = false;
      targetRotX = 0;
      targetRotY = 0;
      targetScale = 1.0;
      targetTranslateY = defaults.y;
      startCardLoop();
      
      // Delay z-index reset slightly so the return animation completes on top
      setTimeout(() => {
        if (!isHovered) {
          card.style.zIndex = idx;
        }
      }, 450);
    });

    // High performance GPU animation loop for this specific card (runs only while active/lerping)
    function updateCardTransform() {
      const diffRotX = targetRotX - currentRotX;
      const diffRotY = targetRotY - currentRotY;
      const diffScale = targetScale - currentScale;
      const diffY = targetTranslateY - currentTranslateY;

      currentRotX += diffRotX * 0.08;
      currentRotY += diffRotY * 0.08;
      currentScale += diffScale * 0.08;
      currentTranslateY += diffY * 0.08;

      if (isHovered) {
        card.style.zIndex = "100";
      }

      const activeRotZ = defaults.rot + (currentRotY * 0.3);
      card.style.transform = `translateY(${currentTranslateY}px) rotate(${activeRotZ}deg) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) scale(${currentScale})`;

      const isMoving = Math.abs(diffRotX) > 0.01 || Math.abs(diffRotY) > 0.01 || Math.abs(diffScale) > 0.001 || Math.abs(diffY) > 0.01;

      if (isHovered || isMoving) {
        requestAnimationFrame(updateCardTransform);
      } else {
        isCardAnimating = false;
      }
    }
  });
}

// ==========================================
// 9. Modals Alerts Controls
// ==========================================
function openNotifyModal(productName) {
  const modal = document.getElementById("notify-modal");
  const title = document.getElementById("modal-product-title");
  if (modal && title) {
    title.textContent = productName;
    modal.style.display = "flex";
  }
}

// ==========================================
// 10. Scroll-Triggered Reveals using GSAP ScrollTrigger
// ==========================================
function setupScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal-item");
  revealItems.forEach(item => {
    gsap.fromTo(item,
      { opacity: 0, translateY: 30 },
      {
        opacity: 1,
        translateY: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });
}



function closeNotifyModal() {
  const modal = document.getElementById("notify-modal");
  if (modal) modal.style.display = "none";
}

document.getElementById("product-notify-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! You'll receive a VIP notification when this item drops.");
  closeNotifyModal();
});

// ==========================================
// 7. Interactive Story & 360° Rotating Bottle Canvas Section
// ==========================================
function setupStoryBottleSection() {
  const section = document.getElementById("story-section");
  const canvas = document.getElementById("story-bottle-canvas");
  const path = document.querySelector(".cs-story-string-path");
  if (!section || !canvas || !path) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const isMobile = window.innerWidth < 768;
  const frameStep = 1; // Preload all frames on all devices
  const totalFrames = 24;
  const loadedFrames = [];
  let loadedCount = 0;
  let lastDrawnFrameIndex = 0; // Cache to prevent canvas flicker
  let cachedCw = 0;
  let cachedCh = 0;
  let isStoryVisible = false;

  // IntersectionObserver to pause rendering when story bottle section is not visible in viewport
  const storyIO = new IntersectionObserver((entries) => {
    isStoryVisible = entries[0].isIntersecting;
    if (isStoryVisible) {
      drawFrame(lastDrawnFrameIndex);
    }
  }, { threshold: 0.05 });
  storyIO.observe(section);

  // Set canvas size (device pixel ratio aware and cached)
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    cachedCw = rect.width;
    cachedCh = rect.height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = cachedCw * dpr;
    canvas.height = cachedCh * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Reset transform and apply scaling cleanly without accumulation
    drawFrame(lastDrawnFrameIndex);
  }

  // Draw specific frame on canvas (uses cached dimensions to avoid layout thrashing)
  function drawFrame(index) {
    const img = loadedFrames[index] || loadedFrames[lastDrawnFrameIndex];
    if (img && img.complete && img.naturalWidth > 0 && cachedCw > 0 && cachedCh > 0) {
      const cw = cachedCw;
      const ch = cachedCh;
      ctx.clearRect(0, 0, cw, ch); // Clear area in user-space coordinates
      
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const scale = Math.min(cw / iw, ch / ih) * 0.95;
      
      const dx = (cw - iw * scale) / 2;
      const dy = (ch - ih * scale) / 2;
      
      ctx.drawImage(img, dx, dy, iw * scale, ih * scale);
      lastDrawnFrameIndex = index;
    }
  }

  // Preload ultra-fast 24 WebP bottle frames (totaling under 160KB!)
  function preloadFrames() {
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(2, '0');
      img.src = `assets/images/video_frames/bottle_frame_${frameNum}.webp`;
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          drawFrame(0);
        }
      };
      loadedFrames.push(img);
    }
  }

  // SVG path line configuration
  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  // Initialize preloader and resizing
  preloadFrames();
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Scroll pointers elements list
  const pointers = [
    document.getElementById("pointer-opening"),
    document.getElementById("pointer-1"),
    document.getElementById("pointer-2"),
    document.getElementById("pointer-3"),
    document.getElementById("pointer-4"),
    document.getElementById("pointer-closing"),
    document.getElementById("pointer-register")
  ];

  // GSAP ScrollTrigger to tie scroll position directly to animation timeline (Active on all devices)
  ScrollTrigger.create({
    trigger: "#story-section",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
    onUpdate: (self) => {
      if (!isStoryVisible) return; // Skip frame drawing and DOM pointer updates when section is off-screen

      const progress = self.progress;

      // 1. Rotate the 360° bottle on canvas (looping the loaded 24 frames)
      const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      drawFrame(frameIndex);

      // 2. Draw the tangled SVG string line matching scroll progress
      const drawProgress = progress * pathLength;
      path.style.strokeDashoffset = pathLength - drawProgress;

      // 3. Show pointers sequentially
      let activeIdx = 0;
      if (progress < 0.15) {
        activeIdx = 0;
      } else if (progress < 0.30) {
        activeIdx = 1;
      } else if (progress < 0.45) {
        activeIdx = 2;
      } else if (progress < 0.60) {
        activeIdx = 3;
      } else if (progress < 0.75) {
        activeIdx = 4;
      } else if (progress < 0.90) {
        activeIdx = 5;
      } else {
        activeIdx = 6;
      }

      pointers.forEach((pointer, index) => {
        if (!pointer) return;
        if (index === activeIdx) {
          pointer.classList.add("active-pointer");
        } else {
          pointer.classList.remove("active-pointer");
        }
      });
    }
  });

  // Handle register form submission
  const waitlistForm = document.getElementById("story-waitlist-form");
  const feedbackMsg = document.getElementById("story-form-feedback");
  if (waitlistForm && feedbackMsg) {
    waitlistForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("story-email-input");
      if (emailInput && emailInput.value) {
        feedbackMsg.textContent = "✓ Successfully Registered for Private Access!";
        feedbackMsg.className = "form-feedback-msg success";
        emailInput.value = "";
        
        alert("Success! You've been added to the waitlist.");
      }
    });
  }
}
