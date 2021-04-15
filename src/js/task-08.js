import imagesRefs from "./gallery-items.js";

// - Создание и рендер разметки по массиву данных и предоставленному шаблону.

const galleryContainer = document.querySelector(".js-gallery");
const modalLightBox = document.querySelector(".js-lightbox");
const lightBoxImage = document.querySelector(".lightbox__image");

const galleryMarkup = (createGalleryCards(imagesRefs));
galleryContainer.insertAdjacentHTML("afterbegin", galleryMarkup);

function createGalleryCards(items) { 
  return items.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
     <a
      class="gallery__link"
      href= "${original}"
     >
    <img 
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt= ${description}
      />
    </a>
   </li>
   `;
  })
    .join('');

};
  
// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
//   изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.

galleryContainer.addEventListener("click", onOpenModal);

function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const imgOriginalUrl = e.target.dataset.source;
  e.target.classList.add("current");
  lightBoxImage.src = imgOriginalUrl;

  modalLightBox.classList.add("is-open");
};

// - Закрытие модального окна по клику на кнопку  `button[data-action="close-lightbox"]`.

  // Очистка значения атрибута src элемента img. lightbox__image.Это необходимо для того,
  // чтобы при следующем открытии модального окна,
  // пока грузится изображение, мы не видели предыдущее.

const closeBtn = document.querySelector('[data-action="close-lightbox"]');

closeBtn.addEventListener("click", onCloseModal);

function onCloseModal(e) {
  modalLightBox.classList.remove("is-open");

  lightBoxImage.src = "";
  const current = document.querySelector(".gallery__image.current");
  current.classList.remove("current");
}

// // Закрытие модального окна по клику на div.lightbox__overlay.

const containerOverlay = document.querySelector(".lightbox__overlay");
containerOverlay.addEventListener("click", onCloseModal);

// - Закрытие модального окна по нажатию клавиши `ESC`.

window.addEventListener("keydown", onEscPress);
function onEscPress(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}