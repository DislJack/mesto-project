import { closePopup, renderLoading } from "./utils.js";
import {toggleButtonState} from "./validate.js";
import createCard from "./card.js";
import { nameProfile, jobProfile, linkInput, titleInput, addPopup, elements, nameInput, jobInput, profilePopup,  validationSettings, inputListCards, submitButtonCards, popupUpdate, avatar, avatarInput, updateFormButton } from "./index.js";
import { updateInformationAboutMe, publishNewCard, updateAvatar, findError } from "./api.js";

function handleSubmit(request, evt, popup) {
  evt.preventDefault();
  const submitFormButton = evt.submitter;
  const buttonText = submitFormButton.textContent;
  const loadingText = 'Сохранение...';
  renderLoading(submitFormButton, true, buttonText, loadingText);
  request()
    .then(() => {
      closePopup(popup);
    })
    .catch(findError)
    .finally(() => {
      renderLoading(submitFormButton, false, buttonText, loadingText);
    });
}

// Функция подтверждения формы загрузки карточки
function handleCardFormSubmit(evt) {
  function makeRequest() {
    return publishNewCard(titleInput.value, linkInput.value)
      .then(data => {
        elements.prepend(createCard(data.link, data.name, data.likes, data.owner._id, data._id, data.owner._id));
        evt.target.reset();
        toggleButtonState(inputListCards, submitButtonCards, validationSettings);
    })
  }
  handleSubmit(makeRequest, evt, addPopup);
}

// Функция настройки ввода формы
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return updateInformationAboutMe(nameInput.value, jobInput.value)
      .then(data => {
        nameProfile.textContent = data.name;
        jobProfile.textContent = data.about;
    })
  }
  handleSubmit(makeRequest, evt, profilePopup);
}

function handleAvatarUpdate(evt) {
  function makeRequest() {
    return updateAvatar(avatarInput.value)
      .then(() => {
        avatar.src = avatarInput.value;
        evt.target.reset();
        toggleButtonState([avatarInput], updateFormButton, validationSettings);
    })
  }
  handleSubmit(makeRequest, evt, popupUpdate);
}

export {handleCardFormSubmit, handleProfileFormSubmit, handleAvatarUpdate};