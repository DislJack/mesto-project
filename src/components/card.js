import { elementTemplate, figureImage, figureCaption, picturePopup } from "./index.js";
import { openPopup } from "./utils.js";
import { deleteCard, putLikeOnCard, deleteLikeOnCard } from "./api.js";

// Проверка соврападания id чтобы отключить кнопку удаления
function checkIdOwner(element, cardOwner) {
  // Страшные цифры - это id пользователя, которые я просто так передал, чтобы сравнивать со всеми id других пользователей
  if (cardOwner !== '8fe3f2f06793e0df171a762f') {
    element.querySelector('.element__delete').classList.add('element__delete_disabled');
    element.querySelector('.element__delete').disabled = true;
  }
}

function changeAvatar(element, linkValue, titleValue) {
  element.querySelector('.element__overlay').addEventListener('click', function () {
    openPopup(picturePopup);
    figureImage.src = linkValue;
    figureImage.alt = titleValue;
    figureCaption.textContent = titleValue;
  });
}

function toggleButtonLikes(cardLikes, element, cardId) {
  // Проверка наличия лайков в карточке
  let count = cardLikes.length;
  if (count != 0) {
    element.querySelector('.element__like-count').classList.add('element__like-count_active');
    element.querySelector('.element__like-count').textContent = count;
  }

  // Проверка совпадения элемента лайка и id пользователя (В данном случае проверка меня как пользователя)
  cardLikes.forEach((like) => {
    if (like._id === '8fe3f2f06793e0df171a762f') {
      element.querySelector('.element__like').classList.add('element__like_active');
    }
  });

  // Часть описывающая поведения подсчёта количества лайков и их закрашивание
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    if (count === 0) {
      element.querySelector('.element__like-count').classList.add('element__like-count_active');
    }
    if (evt.target.classList.toggle('element__like_active')) {
      putLikeOnCard(cardId);
      count++;
      element.querySelector('.element__like-count').textContent = count;
    } else {
      deleteLikeOnCard(cardId);
      count--;
      element.querySelector('.element__like-count').textContent = count;
    }
    if (count === 0) {
      element.querySelector('.element__like-count').classList.remove('element__like-count_active');
    }
  });
}

// Функция создания карточек
export default function createCard(linkValue, titleValue, cardLikes, cardOwner, cardId) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  // Блок кнопки удаления вместе с проверкой
  checkIdOwner(element, cardOwner);
  element.querySelector('.element__delete').addEventListener('click', function (evt) {
    deleteCard(cardId)
    evt = element.closest('.element');
    evt.remove();
  });

  // Блок заполнения контента и его наполнения, а так же изменения
  element.querySelector('.element__image').src = linkValue;
  element.querySelector('.element__image').alt = titleValue;
  element.querySelector('.element__title').textContent = titleValue;

  // Блок настройки кнопки и изменения аватара
  changeAvatar(element, linkValue, titleValue);
  toggleButtonLikes(cardLikes, element, cardId);
  return element;
}