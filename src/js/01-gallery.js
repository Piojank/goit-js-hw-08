import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const qs = s => document.querySelector(s);
const gallery = qs(".gallery");

const galleryList = galleryItems.map((item) => {

    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery__item");
    galleryLink.href = item.original;
    gallery.append(galleryLink);

    const galleryImg = document.createElement("img");
    galleryImg.classList.add("gallery__image");
    galleryImg.src = item.preview;
    galleryImg.alt = item.description;
    galleryLink.append(galleryImg);
});

gallery.insertAdjacentHTML("beforeend", galleryList);

let lightbox = new SimpleLightbox(".gallery a", {
    captionPosition: "outside",
    captionsData: "alt",
    captionDelay: "250",
});

gallery.querySelectorAll('a').forEach((aTag) => {
    aTag.addEventListener('click', (event) => {
        event.preventDefault();
        lightbox.open();
    });
});

gallery.addEventListener("click", event => event.preventDefault());