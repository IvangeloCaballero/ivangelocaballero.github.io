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
