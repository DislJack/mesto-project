import { closePopup } from "./utils.js";
import {toggleButtonState} from "./validate.js";
import createCard from "./card.js";
import { nameProfile, jobProfile, linkInput, titleInput, addPopup, elements, nameInput, jobInput, profilePopup,  validationSettings, inputListCards, submitButtonCards, popupUpdate, avatar } from "./index.js";
import { updateInformationAboutMe, publishNewCard, updateAvatar, renderLoadingCard, renderLoadingUpdate } from "./api.js";

// Функция подтверждения формы загрузки карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoadingCard(evt.target.querySelector('.form__submit-button'), true);
  publishNewCard(titleInput.value, linkInput.value)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {
      elements.prepend(createCard(data.link, data.name, data.likes, data.owner._id, data._id));
  })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingCard(evt.target.querySelector('.form__submit-button'), false);
      evt.target.reset();
      toggleButtonState(inputListCards, submitButtonCards, validationSettings);
      closePopup(addPopup);
    });
}

// Функция настройки ввода формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoadingUpdate(evt.target.querySelector('.form__submit-button'), true);
  updateInformationAboutMe(nameInput.value, jobInput.value).finally(() => {
    renderLoadingUpdate(evt.target.querySelector('.form__submit-button'), false);
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(profilePopup);
  });
}

function handleAvatarUpdate(evt) {
  evt.preventDefault();
  renderLoadingUpdate(evt.target.querySelector('.form__submit-button'), true);
  updateAvatar(popupUpdate.querySelector('.form__input').value).finally(() => {
    renderLoadingUpdate(evt.target.querySelector('.form__submit-button'), false);
    avatar.src = popupUpdate.querySelector('.form__input').value;
    evt.target.reset();
    toggleButtonState(Array.from(evt.target.querySelectorAll('.form__input')), evt.target.querySelector('.form__submit-button'), validationSettings);
    closePopup(popupUpdate);
  });
}

export {handleCardFormSubmit, handleProfileFormSubmit, handleAvatarUpdate};