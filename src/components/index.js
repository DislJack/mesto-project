import '../pages/index.css';

// Переменные и постоянные
const formElement = document.querySelector('form[name=form]');
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
const formCard = document.querySelector('form[name=formCard]');
const elementTemplate = document.querySelector('#element').content;
const figureImage = document.querySelector('.figure__image');
const figureCaption = document.querySelector('.figure__caption');
const nameProfile = document.querySelector('.profile__heading-name');
const jobProfile = document.querySelector('.profile__job');
const popups = document.querySelectorAll('.popup');
const avatarContainer = document.querySelector('.profile__avatar-container');
const avatar = document.querySelector('.profile__avatar');
const popupUpdate = document.querySelector('.popup-update');
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_type_error',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
const inputListCards = Array.from(formCard.querySelectorAll(validationSettings.inputSelector));
const submitButtonCards = formCard.querySelector(validationSettings.submitButtonSelector);

export {elementTemplate, elements, linkInput, titleInput, addPopup, figureImage, figureCaption, picturePopup, nameProfile, jobProfile, nameInput, jobInput, profilePopup, validationSettings, inputListCards, submitButtonCards ,popupUpdate, avatar};

import { openPopup, closePopup } from './utils.js';
import createCard from './card.js';
import {enableValidation} from "./validate.js";
import { handleCardFormSubmit, handleProfileFormSubmit, handleAvatarUpdate } from './modal.js';
import { getInitialCards, getInformationAboutMe } from './api.js';

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
formElement.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);
popupUpdate.addEventListener('submit', handleAvatarUpdate);

// Добавление 6 карточек с помощью JS
getInitialCards().then(data => {
  for (let i = 0; i < data.length; i++) {
    elements.append(createCard(data[i].link, data[i].name, data[i].likes, data[i].owner._id, data[i]._id));
  }
});

// Отображение информации о пользователе с сервера
getInformationAboutMe().then(data => {
  nameProfile.textContent = data.name;
  jobProfile.textContent = data.about;
  avatar.src = data.avatar;
});

// Закрытие popup контейнера с помощью Escape и кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    closePopup(evt.target);
  });
});

enableValidation(validationSettings);