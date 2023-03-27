import { elementTemplate, figureImage, figureCaption, picturePopup } from "./index.js";
import { openPopup } from "./utils.js";
import { deleteCard, putLikeOnCard, deleteLikeOnCard, findError } from "./api.js";

// Проверка соврападания id чтобы отключить кнопку удаления
function checkIdOwner(deleteCan, cardOwner, userId) {
  // Страшные цифры - это id пользователя, которые я просто так передал, чтобы сравнивать со всеми id других пользователей
  if (cardOwner !== userId) {
    deleteCan.classList.add('element__delete_disabled');
    deleteCan.disabled = true;
  }
}

function openImagePopup(element, linkValue, titleValue) {
  element.querySelector('.element__overlay').addEventListener('click', function () {
    openPopup(picturePopup);
    figureImage.src = linkValue;
    figureImage.alt = titleValue;
    figureCaption.textContent = titleValue;
  });
}

function toggleButtonLikes(cardLikes, likeButton, likeCount, cardId, userId) {
  // Проверка наличия лайков в карточке
  let count = cardLikes.length;
  if (count != 0) {
    likeCount.classList.add('element__like-count_active');
    likeCount.textContent = count;
  }

  // Проверка совпадения элемента лайка и id пользователя (В данном случае проверка меня как пользователя)
  cardLikes.forEach((like) => {
    if (like._id === userId) {
      likeButton.classList.add('element__like_active');
    }
  });

  // Часть описывающая поведения подсчёта количества лайков и их закрашивание
  likeButton.addEventListener('click', function (evt) {
    if (count === 0) {
      likeCount.classList.add('element__like-count_active');
    }
    if (!evt.target.classList.contains('element__like_active')) {
      putLikeOnCard(cardId)
        .then(data => {
          evt.target.classList.add('element__like_active');
          likeCount.textContent = data.likes.length;
        })
        .catch(findError);
    } else {
      deleteLikeOnCard(cardId)
        .then(data => {
          evt.target.classList.remove('element__like_active');
          likeCount.textContent = data.likes.length;
        })
        .catch(findError);
    }
    if (count === 0) {
      likeCount.classList.remove('element__like-count_active');
    }
  });
}

// Функция создания карточек
export default function createCard(linkValue, titleValue, cardLikes, cardOwner, cardId, userId) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const deleteCan = element.querySelector('.element__delete');
  const cardImage = element.querySelector('.element__image');
  const likeButton = element.querySelector('.element__like');
  const likeCount = element.querySelector('.element__like-count');

  // Блок кнопки удаления вместе с проверкой
  checkIdOwner(deleteCan, cardOwner, userId);
  deleteCan.addEventListener('click', function () {
    deleteCard(cardId)
      .then(() => {
        element.remove();
      })
      .catch(findError);
  });

  // Блок заполнения контента и его наполнения, а так же изменения
  cardImage.src = linkValue;
  cardImage.alt = titleValue;
  element.querySelector('.element__title').textContent = titleValue;

  // Блок настройки кнопки и изменения аватара
  openImagePopup(element, linkValue, titleValue);
  toggleButtonLikes(cardLikes, likeButton, likeCount, cardId, userId);
  return element;
}