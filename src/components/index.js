import '../pages/index.css';

// Переменные и постоянные
const profileForm = document.forms["profile-form"];
const nameInput = document.querySelector('input[name=name]');
const jobInput = document.querySelector('input[name=job]');
const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');
const picturePopup = document.querySelector('.picture-popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.form__close-button');
const elements = document.querySelector('.elements');
const titleInput = document.querySelector('input[name=name-place]');
const linkInput = document.querySelector('input[name=link]');
const cardForm = document.forms['card-form'];
const elementTemplate = document.querySelector('#element').content;
const figureImage = document.querySelector('.figure__image');
const figureCaption = document.querySelector('.figure__caption');
const nameProfile = document.querySelector('.profile__heading-name');
const jobProfile = document.querySelector('.profile__job');
const popups = document.querySelectorAll('.popup');
const avatarContainer = document.querySelector('.profile__avatar-container');
const avatar = document.querySelector('.profile__avatar');
const updateForm = document.forms['update'];
const popupUpdate = document.querySelector('.popup-update');
const avatarInput = popupUpdate.querySelector('.form__input');
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_type_error',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
const inputListCards = Array.from(cardForm.querySelectorAll(validationSettings.inputSelector));
const submitButtonCards = cardForm.querySelector(validationSettings.submitButtonSelector);
const updateFormButton = updateForm.querySelector(validationSettings.submitButtonSelector);
let userId;

export {elementTemplate, elements, linkInput, titleInput, addPopup, figureImage, figureCaption, picturePopup, nameProfile, jobProfile, nameInput, jobInput, profilePopup, validationSettings, inputListCards, submitButtonCards ,popupUpdate, avatar, avatarInput, updateFormButton};

import { openPopup, closePopup } from './utils.js';
import createCard from './card.js';
import {enableValidation} from "./validate.js";
import { handleCardFormSubmit, handleProfileFormSubmit, handleAvatarUpdate } from './modal.js';
import { getInitialCards, getInformationAboutMe, findError } from './api.js';

// Логика управления элементами
// Открыли popup контейнеры
editButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
addButton.addEventListener('click', () => openPopup(addPopup));

// Кнопки закрыть на popup контейнерах
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

avatarContainer.addEventListener('click', () => {
  openPopup(popupUpdate);
});

// Изменение данных в форме при сохранении формы
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
updateForm.addEventListener('submit', handleAvatarUpdate);

// Загрузка данный с сервера о карточках и пользователе
Promise.all([getInformationAboutMe(), getInitialCards()])
  .then(([userData, cards]) => {
    // Отображение информации о пользователе с сервера
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    avatar.src = userData.avatar;
    userId = userData._id;
    // Добавление карточек с помощью JS
    for (let i = 0; i < cards.length; i++) {
      elements.append(createCard(cards[i].link, cards[i].name, cards[i].likes, cards[i].owner._id, cards[i]._id, userId));
    }
  })
  .catch(findError);

// Закрытие popup контейнера кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closePopup(evt.target);
    }
  });
});

enableValidation(validationSettings);