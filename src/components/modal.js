import { closePopup, renderLoading } from "./utils.js";
import {toggleButtonState} from "./validate.js";
import createCard from "./card.js";
import { nameProfile, jobProfile, linkInput, titleInput, addPopup, elements, nameInput, jobInput, profilePopup,  validationSettings, inputListCards, submitButtonCards, popupUpdate, avatar, avatarInput } from "./index.js";
import { updateInformationAboutMe, publishNewCard, updateAvatar, findError } from "./api.js";

// Функция подтверждения формы загрузки карточки
function handleCardFormSubmit(evt, buttonText='Создать', loadingText='Сохранение...') {
  evt.preventDefault();
  const submitFormButton = evt.submitter;
  renderLoading(submitFormButton, true, buttonText, loadingText);
  publishNewCard(titleInput.value, linkInput.value)
    .then(data => {
      elements.prepend(createCard(data.link, data.name, data.likes, data.owner._id, data._id, data.owner._id));
      evt.target.reset();
      toggleButtonState(inputListCards, submitButtonCards, validationSettings);
      closePopup(addPopup);
  })
    .catch(findError)
    .finally(() => {
      renderLoading(submitFormButton, false, buttonText, loadingText);
    });
}

// Функция настройки ввода формы
function handleProfileFormSubmit(evt, buttonText='Сохранить', loadingText='Сохранение...') {
  evt.preventDefault();
  const submitFormButton = evt.submitter;
  renderLoading(submitFormButton, true, buttonText, loadingText);
  updateInformationAboutMe(nameInput.value, jobInput.value)
    .then(() => {
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;
      closePopup(profilePopup);
    })
    .catch(findError)
    .finally(() => {
      renderLoading(submitFormButton, false, buttonText, loadingText);
    });
}

function handleAvatarUpdate(evt, buttonText='Сохранить', loadingText='Сохранение...') {
  evt.preventDefault();
  const submitFormButton = evt.submitter;
  renderLoading(submitFormButton, true, buttonText, loadingText);
  updateAvatar(avatarInput.value)
    .then(() => {
      avatar.src = avatarInput.value;
      evt.target.reset();
      toggleButtonState(Array.from(avatarInput), submitFormButton, validationSettings);
      closePopup(popupUpdate);
    })
    .catch(findError)
    .finally(() => {
      renderLoading(submitFormButton, false, buttonText, loadingText);
    });
}

export {handleCardFormSubmit, handleProfileFormSubmit, handleAvatarUpdate};