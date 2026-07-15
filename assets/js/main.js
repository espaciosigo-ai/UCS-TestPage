/* ============================================================
   UCS — Boceto landing v1 · Animaciones GSAP 3.15 + ScrollTrigger
   Todo local (assets/js/vendor). Sin dependencias externas.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- utilidades ---------- */

  // Envuelve cada línea visual de un elemento en .split-line > span
  // (sustituto liviano de SplitText, solo por palabras → líneas)
  function splitLines(el) {
    var words = el.innerHTML.trim().split(/\s+(?![^<]*>)/); // respeta <em>
    el.innerHTML = words
      .map(function (w) { return '<span class="w" style="display:inline-block">' + w + "</span>"; })
      .join(" ");
    var lines = [];
    var lastTop = null;
    el.querySelectorAll("span.w").forEach(function (w) {
      var top = w.offsetTop;
      if (top !== lastTop) { lines.push([]); lastTop = top; }
      lines[lines.length - 1].push(w);
    });
    var frag = document.createDocumentFragment();
    lines.forEach(function (ws) {
      var outer = document.createElement("span");
      outer.className = "split-line";
      var inner = document.createElement("span");
      ws.forEach(function (w, i) {
        inner.appendChild(w);
        if (i < ws.length - 1) inner.appendChild(document.createTextNode(" "));
      });
      outer.appendChild(inner);
      frag.appendChild(outer);
    });
    el.innerHTML = "";
    el.appendChild(frag);
    return el.querySelectorAll(".split-line > span");
  }

  /* ---------- preloader ---------- */
  var pre = document.getElementById("preloader");
  var preTl = gsap.timeline({
    onComplete: function () { pre.style.display = "none"; document.body.classList.remove("is-animating"); }
  });
  document.body.classList.add("is-animating");
  if (reduceMotion) {
    pre.style.display = "none";
    document.body.classList.remove("is-animating");
  } else {
    preTl
      .to(".preloader__bar span", { width: "100%", duration: 0.9, ease: "power2.inOut" })
      .to(".preloader__inner", { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" })
      .to(pre, { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, "-=0.1");
  }

  /* ---------- hero: entrada ---------- */
  var heroTitle = document.querySelector(".hero__title");
  if (heroTitle && !reduceMotion) {
    var lines = splitLines(heroTitle);
    var heroTl = gsap.timeline({ delay: 1.35 });
    heroTl
      .from(lines, { yPercent: 110, duration: 0.9, stagger: 0.09, ease: "power4.out" })
      .from(".hero .hero__kicker, .hero .hero__sub", { opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.55")
      .from(".hero__cta .btn", { opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.35")
      .from(".hero__mini", { opacity: 0, y: 14, duration: 0.5 }, "-=0.25")
      .from(".hero__photo", { opacity: 0, scale: 0.92, y: 40, duration: 1, ease: "power3.out" }, 0.15)
      .from("[data-chip]", { opacity: 0, y: 26, scale: 0.85, duration: 0.6, stagger: 0.12, ease: "back.out(1.8)" }, "-=0.5");

    // parallax suave de la foto y chips al hacer scroll
    gsap.to(".hero__photo", {
      yPercent: -8, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
    });
    gsap.to(".hero__chip--1", {
      y: -30, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.4 }
    });
    gsap.to(".hero__arc--1", {
      rotate: 20, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 2 }
    });
  }

  /* ---------- split titles por sección ---------- */
  document.querySelectorAll("[data-split]").forEach(function (el) {
    if (el.closest(".hero")) return;
    if (reduceMotion) return;
    var lines = splitLines(el);
    gsap.from(lines, {
      yPercent: 110, duration: 0.85, stagger: 0.09, ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 84%", once: true }
    });
  });

  /* ---------- reveals genéricos ---------- */
  if (!reduceMotion) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      if (el.closest(".hero")) return; // el hero tiene su timeline propio
      gsap.from(el, {
        opacity: 0, y: 34, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    // grupos con stagger
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      gsap.from(group.children, {
        opacity: 0, y: 40, scale: 0.97, duration: 0.7, ease: "power3.out",
        stagger: { amount: 0.45 },
        scrollTrigger: { trigger: group, start: "top 86%", once: true }
      });
    });

    // bento tiles
    gsap.from("[data-bento]", {
      opacity: 0, y: 46, scale: 0.96, duration: 0.8, ease: "power3.out",
      stagger: { amount: 0.5, grid: "auto" },
      scrollTrigger: { trigger: ".bento__grid", start: "top 84%", once: true }
    });

    // líneas de formación
    document.querySelectorAll("[data-line]").forEach(function (el, i) {
      gsap.from(el, {
        opacity: 0, x: i % 2 ? 60 : -60, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });
  }

  /* ---------- contadores ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion) { el.textContent = target; return; }
    var obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 1.6, ease: "power2.out",
      snap: { val: 1 },
      onUpdate: function () { el.textContent = obj.val; },
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });

  /* ---------- marquee infinito ---------- */
  var track = document.getElementById("marqueeTrack");
  if (track) {
    track.innerHTML += track.innerHTML; // duplicar para loop perfecto
    if (!reduceMotion) {
      var marqueeTween = gsap.to(track, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
      track.parentElement.addEventListener("mouseenter", function () { gsap.to(marqueeTween, { timeScale: 0.25, duration: 0.4 }); });
      track.parentElement.addEventListener("mouseleave", function () { gsap.to(marqueeTween, { timeScale: 1, duration: 0.4 }); });
    }
  }

  /* ---------- carrusel de aulas: deslizable con dedo/mouse (sin scroll-jacking) ---------- */
  (function () {
    var track = document.getElementById("aulasTrack");
    if (!track) return;

    // entrada escalonada de las cards
    if (!reduceMotion) {
      gsap.from(track.children, {
        opacity: 0, x: 60, duration: 0.7, ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: track, start: "top 85%", once: true }
      });
    }

    // flechas: avanzan una card
    function cardStep() {
      var card = track.querySelector(".aula");
      return card ? card.getBoundingClientRect().width + 20 : 340;
    }
    var prev = document.getElementById("aulasPrev");
    var next = document.getElementById("aulasNext");
    if (prev && next) {
      prev.addEventListener("click", function () { track.scrollBy({ left: -cardStep(), behavior: "smooth" }); });
      next.addEventListener("click", function () { track.scrollBy({ left: cardStep(), behavior: "smooth" }); });
      var syncArrows = function () {
        var max = track.scrollWidth - track.clientWidth - 4;
        prev.classList.toggle("is-off", track.scrollLeft <= 4);
        next.classList.toggle("is-off", track.scrollLeft >= max);
      };
      track.addEventListener("scroll", syncArrows, { passive: true });
      window.addEventListener("resize", syncArrows);
      syncArrows();
    }

    // drag-to-scroll con mouse en desktop (en touch ya es nativo)
    if (window.matchMedia("(pointer: fine)").matches) {
      var down = false, startX = 0, startLeft = 0, moved = false;
      track.classList.add("is-grabbable");
      track.addEventListener("pointerdown", function (e) {
        if (e.pointerType !== "mouse") return;
        down = true; moved = false;
        startX = e.clientX; startLeft = track.scrollLeft;
        track.classList.add("is-grabbing");
      });
      window.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 5) moved = true;
        track.scrollLeft = startLeft - dx;
      });
      window.addEventListener("pointerup", function () {
        down = false;
        track.classList.remove("is-grabbing");
      });
      // evita click fantasma en links tras arrastrar
      track.addEventListener("click", function (e) {
        if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
      }, true);
    }
  })();

  /* ---------- zoom scrubbed del auditorio ---------- */
  if (!reduceMotion) {
    var audiImg = document.querySelector("[data-zoom] img");
    if (audiImg) {
      gsap.to(audiImg, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: "[data-zoom]", start: "top 90%", end: "bottom 40%", scrub: 1 }
      });
    }
  } else {
    var z = document.querySelector("[data-zoom] img");
    if (z) z.style.transform = "scale(1)";
  }

  /* ---------- nav: estado scrolled + scroll-spy + burger ---------- */
  var nav = document.getElementById("nav");
  var fab = document.getElementById("fab");
  ScrollTrigger.create({
    start: 40, end: "max",
    onUpdate: function (self) {
      nav.classList.toggle("is-scrolled", self.scroll() > 40);
      fab.classList.toggle("is-visible", self.scroll() > window.innerHeight * 0.6);
    }
  });

  var spyLinks = document.querySelectorAll("[data-spy]");
  spyLinks.forEach(function (link) {
    var id = link.getAttribute("href");
    var sec = document.querySelector(id);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec, start: "top 45%", end: "bottom 45%",
      onToggle: function (self) { link.classList.toggle("is-active", self.isActive); }
    });
  });

  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- botones magnéticos (desktop, puntero fino) ---------- */
  if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
    document.querySelectorAll(".btn--primary, .btn--wsp:not(.btn--nav)").forEach(function (btn) {
      var qx = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
      var qy = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        qx((e.clientX - r.left - r.width / 2) * 0.25);
        qy((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener("mouseleave", function () { qx(0); qy(0); });
    });
  }

  /* ---------- refresh tras cargar imágenes (alturas cambian) ---------- */
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
