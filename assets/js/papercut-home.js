(() => {
  "use strict";
  const root = document.documentElement;
  const videos = [...document.querySelectorAll(".project-media video")];

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionEnabled = () => !motionQuery.matches;
  // Keep the occasional registration beat on the hero name only.
  let beatTimer;
  let beatCleanup;
  const beatInk = [...document.querySelectorAll("h1 .riso")];
  const inView = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom > 100 &&
      rect.top < innerHeight &&
      rect.right > 0 &&
      rect.left < innerWidth
    );
  };
  const clearBeat = () => {
    clearTimeout(beatTimer);
    clearTimeout(beatCleanup);
    beatInk.forEach((element) => element.classList.remove("is-beating"));
  };
  const scheduleBeat = (first = false) => {
    clearBeat();
    if (!motionEnabled() || document.hidden) return;
    beatTimer = setTimeout(
      () => {
        if (!motionEnabled() || document.hidden) return;
        if (document.querySelector("dialog[open]")) {
          scheduleBeat();
          return;
        }
        const direction = Math.random() > 0.5 ? 1 : -1;
        beatInk.filter(inView).forEach((element, index) => {
          const scale = Math.min(
            1.5,
            parseFloat(getComputedStyle(element).fontSize) / 100,
          );
          element.style.setProperty(
            "--beat-x",
            `${direction * (3 + Math.random() * 2) * scale}px`,
          );
          element.style.setProperty("--beat-y", `${-direction * 2 * scale}px`);
          element.style.setProperty("--beat-delay", `${index * 45}ms`);
          element.classList.add("has-beat", "is-beating");
        });
        beatCleanup = setTimeout(() => scheduleBeat(), 1500);
      },
      first ? 3200 : 6500 + Math.random() * 5000,
    );
  };
  motionQuery.addEventListener("change", () => scheduleBeat(true));
  document.addEventListener("visibilitychange", () => scheduleBeat(true));
  window.addEventListener("pagehide", clearBeat);
  window.addEventListener("pageshow", () => scheduleBeat(true));
  scheduleBeat(true);

  const portraitButton = document.querySelector(".portrait-toggle");
  portraitButton.hidden = false;
  portraitButton.addEventListener("click", () => {
    const original = document
      .querySelector(".portrait-print")
      .classList.toggle("is-original");
    portraitButton.setAttribute("aria-pressed", String(original));
    portraitButton.textContent = original
      ? "Two-color print ↙"
      : "Original photo ↗";
  });

  // Paper outlines follow actual sizes; tape artwork is static for scroll stability.
  root.style.setProperty(
    "--pink-tint",
    `${Papercut.dots("rgba(255,72,176,.3)", 6, (1.45 * 2) / 3)}, var(--sheet)`,
  );
  root.style.setProperty(
    "--blue-tint",
    `${Papercut.dotsDiag("rgba(0,120,191,.22)", 8, (1.25 * 2) / 3)}, var(--sheet)`,
  );
  const scraps = [...document.querySelectorAll(".scrap")];
  const redraw = (element) => {
    const width = element.offsetWidth,
      height = element.offsetHeight;
    // A suspended/hidden page may briefly report zero; retain its last outline.
    if (width <= 0 || height <= 0) return;
    const seed = Number(
      element.dataset.paperSeed || scraps.indexOf(element) + 7,
    );
    element.style.setProperty(
      "--torn-outline",
      Papercut.torn(
        width,
        height,
        seed,
        element.classList.contains("intern-ticket") ? 2 : 4,
        (16 * 2) / 3,
      ),
    );
    element.style.setProperty(
      "--paper-dots",
      Papercut.dots("var(--blue)", 4, 1),
    );
  };
  const paperResize =
    "ResizeObserver" in window
      ? new ResizeObserver((entries) =>
          entries.forEach(({ target }) => redraw(target)),
        )
      : null;
  scraps.forEach((scrap) => {
    const backing = document.createElement("div");
    backing.className = "torn-backing";
    backing.setAttribute("aria-hidden", "true");
    scrap.prepend(backing);
  });
  scraps.forEach((element) => {
    redraw(element);
    paperResize?.observe(element);
  });
  if (!paperResize)
    window.addEventListener("resize", () =>
      scraps.forEach(redraw),
    );
  window.addEventListener("pageshow", () => scraps.forEach(redraw));

  // Read the actual heading positions, including after details expand or a
  // direct hash jump. Intersection entries alone can leave a stale selection.
  const navLinks = [...document.querySelectorAll("nav a")];
  const navTargets = navLinks.map((link) =>
    document.querySelector(link.getAttribute("href")),
  );
  const masthead = document.querySelector(".masthead");
  let navigationFrame = 0;
  let previousScroll = Math.max(0, window.scrollY);
  let scrollTravel = 0;
  let navigationHoldUntil = 0;
  const revealNavigation = () => {
    masthead.classList.remove("is-hidden");
    scrollTravel = 0;
    previousScroll = Math.max(0, window.scrollY);
  };
  const updateNavigation = () => {
    navigationFrame = 0;
    const scroll = Math.max(0, Math.min(window.scrollY,
      document.documentElement.scrollHeight - innerHeight));
    const delta = scroll - previousScroll;
    if (delta !== 0) {
      scrollTravel = Math.sign(delta) === Math.sign(scrollTravel)
        ? scrollTravel + delta : delta;
    }
    previousScroll = scroll;
    masthead.classList.toggle("is-scrolled", scroll > 8);
    if (scroll <= masthead.offsetHeight + 24 || performance.now() < navigationHoldUntil ||
        (masthead.contains(document.activeElement) && document.activeElement.matches(":focus-visible"))) {
      revealNavigation();
    } else if (scrollTravel > 32) {
      masthead.classList.add("is-hidden");
    } else if (scrollTravel < -12) {
      masthead.classList.remove("is-hidden");
    }
    // The reading line stays stable while the masthead slides in and out.
    const readingLine = masthead.offsetHeight + 28;
    let active = 0;
    navTargets.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= readingLine) active = index;
    });
    navLinks.forEach((link, index) => {
      if (index === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  const queueNavigation = () => {
    if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation);
  };
  window.addEventListener("scroll", queueNavigation, { passive: true });
  const resetNavigation = () => {
    revealNavigation();
    queueNavigation();
  };
  window.addEventListener("resize", resetNavigation);
  window.addEventListener("hashchange", resetNavigation);
  window.addEventListener("pageshow", resetNavigation);
  masthead.addEventListener("focusin", revealNavigation);
  document.addEventListener("click", (event) => {
    if (!event.target.closest('a[href^="#"]')) return;
    navigationHoldUntil = performance.now() + 1200;
    revealNavigation();
  });
  if ("ResizeObserver" in window) {
    new ResizeObserver(queueNavigation).observe(document.querySelector("main"));
  }
  queueNavigation();

  if ("IntersectionObserver" in window) {
    // Adapt the official press/registration entrance to first viewport entry.
    // No pending/hidden state: content stays readable if JS or observation fails.
    const entryTargets = [...document.querySelectorAll(
      ".news-scrap, .intern-ticket, .project-media, .contact-scrap, .section-top h2, .footer h2",
    )];
    const entered = new WeakSet();
    const entrance = new IntersectionObserver((entries) => {
      let paperIndex = 0;
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        entered.add(target);
        entrance.unobserve(target);
        if (!motionEnabled() || document.hidden || target.matches(":focus-within")) return;
        if (target.classList.contains("scrap")) {
          target.style.setProperty("--print-delay", `${Math.min(paperIndex++, 2) * 65}ms`);
        }
        target.classList.add("is-printing");
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    const configureEntrances = () => {
      entrance.disconnect();
      entryTargets.forEach((target) => {
        target.classList.remove("is-printing");
        if (!motionEnabled() || entered.has(target)) return;
        if (target.getBoundingClientRect().top < innerHeight) entered.add(target);
        else entrance.observe(target);
      });
    };
    motionQuery.addEventListener("change", configureEntrances);
    configureEntrances();

    const mediaObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ target: video, isIntersecting }) => {
          if (!isIntersecting) video.pause();
        }),
      { threshold: 0.4 },
    );
    videos.forEach((video) => {
      mediaObserver.observe(video);
      video.addEventListener("error", () => {
        video.closest("figure").querySelector(".media-error").hidden = false;
      });
    });
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) videos.forEach((video) => video.pause());
  });

  // Only the decorative halftone responds to the pointer; text and media stay
  // fixed. No work is scheduled on touch devices or with reduced motion.
  const pointerQuery = matchMedia("(hover: hover) and (pointer: fine)");
  const cover = document.querySelector(".cover");
  const disc = document.querySelector(".halftone-disc");
  let pointerFrame = 0;
  let pointerX = 0, pointerY = 0;
  const resetPointer = () => {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    disc.style.removeProperty("translate");
  };
  cover.addEventListener("pointermove", (event) => {
    if (!motionEnabled() || !pointerQuery.matches || event.pointerType === "touch") return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      const bounds = cover.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (pointerX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (pointerY - bounds.top) / bounds.height * 2 - 1));
      disc.style.translate = `${x * 4}px ${y * 4}px`;
    });
  });
  cover.addEventListener("pointerleave", resetPointer);
  motionQuery.addEventListener("change", resetPointer);
  pointerQuery.addEventListener("change", resetPointer);
  document.addEventListener("visibilitychange", resetPointer);

  const dialog = document.querySelector(".media-dialog");
  const dialogMedia = dialog.querySelector(".dialog-media");
  const dialogContext = dialog.querySelector(".dialog-context");
  let trigger;
  const closeDialog = () => dialog.close();
  document.querySelectorAll(".expand-media").forEach((button) => {
    button.hidden = false;
    const frame = button.closest("article").querySelector(".media-frame");
    if (!frame.querySelector("video")) {
      frame.classList.add("is-expandable");
      frame.addEventListener("click", () => button.click());
    }
    button.addEventListener("click", () => {
      trigger = button;
      const article = button.closest("article");
      const original = article.querySelector("video, .media-frame img");
      dialog.querySelector("#dialog-title").textContent =
        article.querySelector("h3").textContent;
      dialog.querySelector(".dialog-caption").textContent =
        original.getAttribute("aria-label") || original.alt;
      const videoSource = original.dataset.originalVideo;
      const media = videoSource
        ? document.createElement("video")
        : original.cloneNode(true);
      if (videoSource) {
        media.src = videoSource;
        media.poster = original.dataset.poster;
        media.setAttribute("aria-label", original.alt);
        media.muted = true;
        media.loop = true;
        media.playsInline = true;
      }
      media.removeAttribute("loading");
      if (media.tagName === "VIDEO") {
        media.controls = true;
        media.autoplay = false;
      }
      dialogMedia.replaceChildren(media);
      const info = article.querySelector(".project-info");
      dialogContext.replaceChildren(...[...info.children].map((node) => node.cloneNode(true)));
      dialog.showModal();
      document.body.classList.add("dialog-open");
      videos.forEach((video) => video.pause());
      dialog.querySelector(".close-dialog").focus();
      if (media.tagName === "VIDEO") {
        media.addEventListener(
          "error",
          () => {
            dialog.querySelector(".dialog-caption").textContent =
              "Video unavailable. The original video link is available in the project.";
          },
          { once: true },
        );
      }
    });
  });
  dialog.querySelector(".close-dialog").addEventListener("click", closeDialog);
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const controls = [
      ...dialog.querySelectorAll("button, a[href], video[controls]"),
    ];
    const first = controls[0],
      last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      closeDialog();
  });
  dialog.addEventListener("close", () => {
    dialogMedia.querySelector("video")?.pause();
    dialogMedia.replaceChildren();
    dialogContext.replaceChildren();
    document.body.classList.remove("dialog-open");
    trigger?.focus({ preventScroll: true });
  });
  root.classList.add("has-media-dialog");
})();
