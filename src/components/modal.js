import { closePopup } from "./utils.js";
import {toggleButtonState} from "./validate.js";
import createCard from "./card.js";
import { nameProfile, jobProfile, linkInput, titleInput, addPopup, elements, nameInput, jobInput, profilePopup,  validationSettings, inputListCards, submitButtonCards } from "./index.js";

// Функция подтверждения формы загрузки карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  elements.prepend(createCard(linkInput.value, titleInput.value));
  evt.target.reset();
  toggleButtonState(inputListCards, submitButtonCards, validationSettings);
  closePopup(addPopup);
}

// Функция настройки ввода формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

export {handleCardFormSubmit, handleProfileFormSubmit};