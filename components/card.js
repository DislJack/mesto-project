import { elementTemplate, figureImage, figureCaption, picturePopup } from "./index.js";
import { openPopup } from "./utils.js";

// Функция создания карточек
export default function createCard(linkValue, titleValue) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt = element.closest('.element');
    evt.remove();
  });
  element.querySelector('.element__image').src = linkValue;
  element.querySelector('.element__image').alt = titleValue;
  element.querySelector('.element__overlay').addEventListener('click', function () {
    openPopup(picturePopup);
    figureImage.src = linkValue;
    figureImage.alt = titleValue;
    figureCaption.textContent = titleValue;
  });
  element.querySelector('.element__title').textContent = titleValue;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  return element;
}