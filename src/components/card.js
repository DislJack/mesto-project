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
  let count = 0;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    if (count === 0) {
      element.querySelector('.element__like-count').classList.add('element__like-count_active');
    }
    if (evt.target.classList.toggle('element__like_active')) {
      count++;
      element.querySelector('.element__like-count').textContent = count;
    } else {
      count--;
      element.querySelector('.element__like-count').textContent = count;
    }
    if (count === 0) {
      element.querySelector('.element__like-count').classList.remove('element__like-count_active');
    }
  });
  return element;
}