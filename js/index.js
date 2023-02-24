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
const likeButtons = document.querySelectorAll('.element__like');
const elements = document.querySelector('.elements');
const titleInput = document.querySelector('input[name=name-place]');
const linkInput = document.querySelector('input[name=link]');
const formCard = document.querySelector('form[name=formCard]');
const deleteButton = document.querySelectorAll('.element__delete');
const elementTemplate = document.querySelector('#element').content;
const figureImage = document.querySelector('.figure__image');
const figureCaption = document.querySelector('.figure__caption');
const nameProfile = document.querySelector('.profile__heading-name');
const jobProfile = document.querySelector('.profile__job');
const popups = document.querySelectorAll('.popup');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функции
// Функция открытия popup контейнеров
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия popup контейнеров
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция настройки ввода формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Функция создания карточек
function createCard(linkValue, titleValue) {
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

// Функция отображения сообщения об ощибке
function showInputError(element, error) {
  const errorMessage = document.querySelector(`.${element.id}-error`);
  errorMessage.classList.add('form__input-error_active');
  errorMessage.textContent = error;
  element.classList.add('form__input_type_error');
}

// Функция удаления сообщения об ошибке
function hideInputError(element) {
  const errorMessage = document.querySelector(`.${element.id}-error`);
  errorMessage.classList.remove('form__input-error_active');
  errorMessage.textContent = '';
  element.classList.remove('form__input_type_error');
}

// Функция проверки валидности поля ввода
function isValid(input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error);
  } else if (!input.value.length) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage);
  } else {
    hideInputError(input);
  }
}

// Функция проверки всех полей ввода
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

// Функция деактивации кнопки
function toggleButtonState(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add('form__submit-button_type_error');
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('form__submit-button_type_error');
  }
}

// Функция добавления слушателей на каждое поле ввода
function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const submitButton = form.querySelector('.form__submit-button');
  toggleButtonState(inputList, submitButton);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(input);
      toggleButtonState(inputList, submitButton);
    });
  });
}

// Функция валидации формы
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((form) => {
    setEventListeners(form);
  });
}

// Функция подтверждения формы загрузки карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  elements.prepend(createCard(linkInput.value, titleInput.value));
  evt.target.reset();
  enableValidation();
  closePopup(addPopup);
}

// Логика управления элементами
// Открыли popup контейнеры
editButton.addEventListener('click', () => openPopup(profilePopup));
addButton.addEventListener('click', () => openPopup(addPopup));

// Кнопки закрыть на popup контейнерах
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Изменение данных в форме при сохранении формы
formElement.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);

// Добавление 6 карточек с помощью JS
for (let i = 0; i < initialCards.length; i++) {
  elements.append(createCard(initialCards[i].link, initialCards[i].name));
}

// Закрытие popup контейнера с помощью Escape и кликом на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
  document.addEventListener('keydown', (evt) => {
    if (popup.classList.contains('popup_opened')) {
      if (evt.key === 'Escape') {
        closePopup(popup);
      } 
    }
  });
});

enableValidation();