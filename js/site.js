document.addEventListener("DOMContentLoaded", () => {

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

  images.forEach(img => img.classList.add("zoomable-image"));

  const overlay = document.createElement("div");
  overlay.className = "image-overlay";
  overlay.setAttribute("aria-hidden", "true");

  const overlayImg = document.createElement("img");
  overlayImg.alt = "";
  overlay.appendChild(overlayImg);

  document.body.appendChild(overlay);

  const closeOverlay = () => {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    overlayImg.removeAttribute("src");
    overlayImg.alt = "";
    document.body.style.overflow = "";
  };

  images.forEach(img => {
    
img.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  overlayImg.src = img.currentSrc || img.src;
  overlayImg.alt = img.alt || "";

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

overlay.addEventListener("click", (e) => {
  e.stopPropagation();
  closeOverlay();
});

  });

  overlay.addEventListener("click", closeOverlay);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeOverlay();
    }
  });

}); // ✅ FIXED (was IIFE)

/* ================= NAV ================= */
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

/* ================= REVEAL ================= */
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

/* ================= PROGRESS BAR ================= */
window.addEventListener("scroll", () => {
  const bar = document.getElementById("progress");
  if (!bar) return;

  let scrollTop = window.scrollY;
  let height = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (scrollTop / height) * 100 + "%";
});

/* ================= BUTTON EFFECT ================= */
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

/* ================= FADE NAV ================= */
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

/* ==========================================================
   GALLERY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".gallery-card");
    const filters = document.querySelectorAll(".filter-btn");

    /* ==========================
       FILTERS
    ========================== */

    filters.forEach(button => {

        button.addEventListener("click", () => {

            filters.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {

                if (
                    filter === "all" ||
                    card.classList.contains(filter)
                ) {

                    card.classList.remove("hide");

                } else {

                    card.classList.add("hide");

                }

            });

        });

    });

    /* ==========================
       LIGHTBOX
    ========================== */

    const modal = document.createElement("div");

    modal.className = "gallery-modal";

    modal.innerHTML = `
        <div class="gallery-modal-content">

            <button class="gallery-close">&times;</button>

            <img id="galleryModalImage" src="" alt="">

            <div class="gallery-modal-info">

                <span id="galleryCategory"></span>

                <h2 id="galleryTitle"></h2>

                <p id="gallerySoftware"></p>

                <a id="galleryLink"
                   class="btn btn-primary"
                   href="#">
                    View Project →
                </a>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    const modalImg = document.getElementById("galleryModalImage");
    const modalTitle = document.getElementById("galleryTitle");
    const modalCategory = document.getElementById("galleryCategory");
    const modalSoftware = document.getElementById("gallerySoftware");
    const modalLink = document.getElementById("galleryLink");

    /* ==========================
       OPEN MODAL
    ========================== */

    cards.forEach(card => {

        card.addEventListener("click", () => {

            modal.classList.add("show");

            modalImg.src =
                card.querySelector("img").src;

            modalTitle.textContent =
                card.dataset.title;

            modalCategory.textContent =
                card.dataset.category;

            modalSoftware.textContent =
                card.dataset.software || "";

            if (card.dataset.link) {

                modalLink.href =
                    card.dataset.link;

                modalLink.style.display =
                    "inline-flex";

            } else {

                modalLink.style.display =
                    "none";

            }

        });

    });

    /* ==========================
       CLOSE BUTTON
    ========================== */

    modal
        .querySelector(".gallery-close")
        .addEventListener("click", () => {

            modal.classList.remove("show");

        });

    /* ==========================
       CLICK OUTSIDE
    ========================== */

    modal.addEventListener("click", e => {

        if (e.target === modal) {

            modal.classList.remove("show");

        }

    });

    /* ==========================
       ESC KEY
    ========================== */

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            modal.classList.remove("show");

        }

    });

});


/* VIDEO AUTOPLAY */

document.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll(".gallery-card video")
        .forEach(video => {

            video.muted = true;
            video.loop = true;
            video.autoplay = true;
            video.playsInline = true;

            video.play().catch(() => {});

        });

});

