(() => {

  // ✅ TARGET ALL CLICKABLE IMAGES
  const images = Array.from(document.querySelectorAll(
    ".project-hero img, \
     .gallery-item img, \
     .motor-linkage-placeholder img, \
     .about-profile img, \
     .zoomable-image"
  )).filter(img => {
    const src = img.getAttribute("src");
    return src && src.trim() !== "";
  });

  if (!images.length) return;

  // ✅ ENSURE ALL HAVE CLICK CURSOR
  images.forEach(img => img.classList.add("zoomable-image"));

  // ✅ CREATE OVERLAY
  const overlay = document.createElement("div");
  overlay.className = "image-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const overlayImg = document.createElement("img");
  overlayImg.alt = "";
  overlay.appendChild(overlayImg);

  document.body.appendChild(overlay);

  // ✅ CLOSE FUNCTION
  const closeOverlay = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    overlayImg.removeAttribute("src");
    overlayImg.alt = "";
    document.body.style.overflow = "";
  };

  // ✅ OPEN ON CLICK
  images.forEach(img => {
    img.addEventListener("click", () => {
      overlayImg.src = img.currentSrc || img.src;
      overlayImg.alt = img.alt || "";
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  // ✅ CLICK OUTSIDE TO CLOSE
  overlay.addEventListener("click", closeOverlay);

  // ✅ ESC KEY CLOSE
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeOverlay();
    }
  });

})();



(function () {
  var btn = document.getElementById("nav-toggle");
  var menu = document.getElementById("site-nav");

  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }
})();

function revealOnScroll() {
  const elements = document.querySelectorAll(
    ".project-card, .prose-section, .hero, .section, .gallery-item"
  );

  const trigger = window.innerHeight * 0.85;

  elements.forEach((el) => {
    el.classList.add("reveal");
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

window.addEventListener("scroll", () => {
  const bar = document.getElementById("progress");
  if (!bar) return;

  let scrollTop = window.scrollY;
  let height = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (scrollTop / height) * 100 + "%";
});

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

document.querySelectorAll("a").forEach((link) => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener("click", function (e) {
      if (this.target === "_blank") return;
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location = this.href;
      }, 300);
    });
  }
});
``
