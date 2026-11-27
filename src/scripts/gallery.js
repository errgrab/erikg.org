const lightbox = document.querySelector("#gallery-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxName = lightbox?.querySelector(".lightbox-name");

function closeLightbox() {
    lightbox?.classList.remove("open");
    lightbox?.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".icon-card").forEach((card) => {
    card.addEventListener("click", () => {
        const image = card.querySelector("img");
        if (!image || !lightbox || !lightboxImage) return;
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        if (lightboxName) lightboxName.textContent = image.alt;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

lightbox?.addEventListener("click", closeLightbox);
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
});
