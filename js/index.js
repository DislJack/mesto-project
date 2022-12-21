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
const submitButton = document.querySelectorAll('.form__submit-button');
const likeButtons = document.querySelectorAll('.element__like');
const elements = document.querySelector('.elements');
const titleInput = document.querySelector('input[name=name-place]');
const linkInput = document.querySelector('input[name=link]');
const formCard = document.querySelector('form[name=formCard]');
const deleteButton = document.querySelectorAll('.element__delete');
const elementTemplate = document.querySelector('#element').content;
const figureImage = document.querySelector('.figure__image');
const figureCaption = document.querySelector('.figure__caption');
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
  let name = document.querySelector('.profile__heading-name');
  let job = document.querySelector('.profile__job');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup);
}

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

// Функция подтверждения формы загрузки карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  elements.prepend(createCard(linkInput.value, titleInput.value));
  evt.target.reset();
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