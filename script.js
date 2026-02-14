/**
 * JIAYI LINE - EXCLUSIVE GIFT WEBSITE
 * Optimized & Refactored by Gemini
 * Performance: 60FPS | GPU Accelerated | Battery Friendly
 */

"use strict";

// --- CONFIGURATION ---
const CONFIG = {
  startDate: "2024-02-14T00:00:00", // DATE DE DÉBUT
  musicVolume: 0.5,
  colors: ["#ff8fab", "#ffe6f2", "#d4af37"], // Couleurs confettis
  sakuraIntensity: 400, // Intervalle de création (ms)
  typewriterSpeed: 40, // Vitesse d'écriture (ms)
};

// --- DOM CACHE (Accès rapide aux éléments) ---
const DOM = {
  body: document.body,
  preloader: document.getElementById("preloader"),
  musicBtn: document.querySelector(".play-btn"),
  musicIcon: document.getElementById("play-icon"),
  audio: document.getElementById("bg-music"),
  disk: document.querySelector(".disk-animation"),
  timerDisplay: document.getElementById("love-timer"),
  gachaMachine: document.querySelector(".gacha-machine"),
  prizeArea: document.querySelector(".prize-reveal-area"),
  letterContainer: document.querySelector(".letter-container"),
  typewriter: document.getElementById("typewriter"),
  aurora: document.querySelector(".aurora-container"),
};


/* =========================================
   1. CORE: CHARGEMENT & INIT
   ========================================= */
window.addEventListener("load", () => {
  // Délai artificiel pour l'esthétique du chargement
  setTimeout(() => {
    if (DOM.preloader) {
      DOM.preloader.style.opacity = "0";
      DOM.preloader.style.pointerEvents = "none";

      // Nettoyage du DOM pour libérer la mémoire
      setTimeout(() => DOM.preloader.remove(), 1000);
    }

    // Démarrage des systèmes
    App.init();

    console.log(
      "%c ❤️ JIAYI UNIVERSE READY ❤️ ",
      "background: #ff69b4; color: white; font-weight: bold; padding: 5px;",
    );
  }, 1500);
});

/* =========================================
   2. APP CONTROLLER (Centralisé)
   ========================================= */
const App = {
  init() {
    ScrollReveal.init();
    SakuraSystem.init();
    TimerSystem.start();
    AudioSystem.init();
    ParallaxSystem.init();
    TypewriterSystem.init();
    GameSystem.init();
  },
};

/* =========================================
   3. SCROLL REVEAL (Intersection Observer)
   ========================================= */
const ScrollReveal = {
  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Stop observation une fois visible
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    document
      .querySelectorAll(
        ".reveal, .timeline-item, .gallery-card, .section-title",
      )
      .forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
      });
  },
};

/* =========================================
   4. SYSTÈME SAKURA (Optimisé pour batterie)
   ========================================= */
const SakuraSystem = {
  container: null,
  interval: null,
  isRunning: false,

  init() {
    this.container = document.createElement("div");
    this.container.id = "sakura-rain-layer";
    Object.assign(this.container.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "0",
    });
    document.body.prepend(this.container);

    // Gestion de la visibilité (Pause si l'onglet est caché)
    document.addEventListener("visibilitychange", () => {
      document.hidden ? this.stop() : this.start();
    });

    this.start();
  },

  createPetal() {
    if (document.hidden) return; // Sécurité supplémentaire

    const petal = document.createElement("div");
    petal.classList.add("sakura");

    // Randomisation performante
    const size = Math.random() * 10 + 8;
    const startLeft = Math.random() * 100;
    const duration = Math.random() * 5 + 6;

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${startLeft}vw`;
    petal.style.animationDuration = `${duration}s`;

    this.container.appendChild(petal);

    // Nettoyage automatique
    setTimeout(() => petal.remove(), duration * 1000);
  },

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.interval = setInterval(
      () => this.createPetal(),
      CONFIG.sakuraIntensity,
    );
  },

  stop() {
    this.isRunning = false;
    clearInterval(this.interval);
  },
};

/* =========================================
   5. TIMER (Précision & Mise en forme)
   ========================================= */
const TimerSystem = {
  target: new Date(CONFIG.startDate).getTime(),

  update() {
    if (!DOM.timerDisplay) return;

    const now = new Date().getTime();
    const diff = now - this.target;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    const hStr = hours.toString().padStart(2, "0");
    const mStr = minutes.toString().padStart(2, "0");

    DOM.timerDisplay.innerHTML = `
            <span style="font-size: 1.5em; font-weight:bold; color:#fb6f92">${days}</span> Jours 
            <span style="font-size: 1.5em; font-weight:bold; color:#fb6f92">${hStr}</span> Heures
            <span style="font-size: 1.5em; font-weight:bold; color:#fb6f92">${mStr}</span> Min
        `;
  },

  start() {
    this.update();
    setInterval(() => this.update(), 60000);
  },
};

/* =========================================
   6. AUDIO SYSTEM
   ========================================= */
const AudioSystem = {
  isPlaying: false,

  init() {
    if (!DOM.musicBtn) return;
    DOM.audio.volume = CONFIG.musicVolume;
    DOM.musicBtn.addEventListener("click", () => this.toggle());
  },

  toggle() {
    if (this.isPlaying) {
      DOM.audio.pause();
      DOM.musicIcon.className = "fa-solid fa-play";
      if (DOM.disk) DOM.disk.style.animationPlayState = "paused";
    } else {
      DOM.audio
        .play()
        .then(() => {
          DOM.musicIcon.className = "fa-solid fa-pause";
          if (DOM.disk) DOM.disk.style.animationPlayState = "running";
        })
        .catch((err) => alert("Tap anywhere first to enable audio!"));
    }
    this.isPlaying = !this.isPlaying;
  },
};

/* =========================================
   7. GACHA GAME (Jeu des Cadeaux)
   ========================================= */
const GameSystem = {
  prizes: [
    {
      title: "Deseo Libre 🔥",
      desc: "Pide lo que quieras. Hoy no puedo decir no.",
      code: "JOKER-CARD",
    },
    {
      title: "Cena Romántica",
      desc: "Prepárate, nos vamos a tu lugar favorito.",
      code: "DINNER-DATE",
    },
    {
      title: "Día de Mimos",
      desc: "Masajes, películas y cero estrés.",
      code: "SPA-DAY",
    },
    {
      title: "Shopping Hello Kitty",
      desc: "Vamos a buscar algo rosa para ti.",
      code: "KITTY-SHOP",
    },
  ],

  init() {
    if (DOM.gachaMachine) {
      DOM.gachaMachine.addEventListener("click", () => this.play());
    }
  },

  play() {
    // Animation CSS au clic
    DOM.gachaMachine.style.transform = "scale(0.95)";
    setTimeout(() => (DOM.gachaMachine.style.transform = "scale(1)"), 150);

    // Confettis
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: CONFIG.colors,
        shapes: ["circle", "heart"],
      });
    }

    // Sélection aléatoire
    const prize = this.prizes[Math.floor(Math.random() * this.prizes.length)];

    // Affichage
    if (DOM.prizeArea) {
      const titleEl = document.getElementById("prize-text");
      const descEl = document.getElementById("prize-desc-text");
      const codeEl = document.getElementById("prize-code-text");

      // Reset pour animation
      DOM.prizeArea.style.display = "none";
      DOM.prizeArea.classList.remove("active");

      setTimeout(() => {
        titleEl.innerText = prize.title;
        descEl.innerText = prize.desc;
        codeEl.innerText = prize.code;

        DOM.prizeArea.style.display = "block";
        void DOM.prizeArea.offsetWidth; // Force Reflow
        DOM.prizeArea.classList.add("active");
        DOM.prizeArea.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 300);
    }
  },
};

/* =========================================
   8. TYPEWRITER (Machine à écrire fluide)
   ========================================= */
const TypewriterSystem = {
  init() {
    if (!DOM.letterContainer || !DOM.typewriter) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Vérifie si vide pour ne pas relancer
            if (DOM.typewriter.innerHTML === "") {
              this.type(DOM.typewriter, LETTER_TEXT);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    ); // Se lance quand 30% de la lettre est visible

    observer.observe(DOM.letterContainer);
  },

  type(element, text) {
    let i = 0;
    // On remplace les sauts de ligne par des balises HTML
    const formattedText = text.replace(/\n/g, "<br>");
    // Pour l'effet de frappe, on utilise une version brute
    // Note: Pour simplifier, on écrit le texte formaté mais on gère les délais

    // Approche simplifiée mais robuste pour les sauts de ligne
    const typeLoop = () => {
      if (i < text.length) {
        const char = text.charAt(i);
        element.innerHTML += char === "\n" ? "<br>" : char;
        i++;
        setTimeout(typeLoop, CONFIG.typewriterSpeed);
      }
    };
    typeLoop();
  },
};

/* =========================================
   9. PARALLAX SYSTEM (GPU Optimisé)
   ========================================= */
const ParallaxSystem = {
  mouseX: 0,
  mouseY: 0,
  targetX: 0,
  targetY: 0,

  init() {
    // Désactiver sur mobile pour performance
    if (window.matchMedia("(hover: none)").matches) return;

    document.addEventListener("mousemove", (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      this.mouseX = (e.clientX - windowHalfX) / 100;
      this.mouseY = (e.clientY - windowHalfY) / 100;
    });

    this.animate();
  },

  animate() {
    // Interpolation linéaire (Lerp) pour la fluidité
    this.targetX += (this.mouseX - this.targetX) * 0.05;
    this.targetY += (this.mouseY - this.targetY) * 0.05;

    if (DOM.aurora) {
      DOM.aurora.style.transform = `translate3d(${this.targetX}px, ${this.targetY}px, 0)`;
    }

    requestAnimationFrame(() => this.animate());
  },
};
