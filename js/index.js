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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция настройки ввода формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = document.querySelector('.profile__heading-name');
  let job = document.querySelector('.profile__job');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Функция добавления карточек на страницу
function addCardsBlock(i) {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt = element.closest('.element');
    evt.remove();
  });
  element.querySelector('.element__overlay').addEventListener('click', function () {
    openPopup(picturePopup);
    const figureImage = document.querySelector('.figure__image');
    figureImage.src = initialCards[i].link;
    figureImage.alt = initialCards[i].name;
    const figureCaption = document.querySelector('.figure__caption');
    figureCaption.textContent = initialCards[i].name;
  });
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__image').src = initialCards[i].link;
  element.querySelector('.element__title').textContent = initialCards[i].name;
  elements.append(element);
}

// Функция добавления карточки
function addCard() {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt = element.closest('.element');
    evt.remove();
  });
  element.querySelector('.element__overlay').addEventListener('click', function () {
    openPopup(profilePopup);
    const figureImage = document.querySelector('.figure__image');
    figureImage.src = linkInput.value;
    figureImage.alt = titleInput.value;
    const figureCaption = document.querySelector('.figure__caption');
    figureCaption.textContent = titleInput.value;
  });
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__image').src = linkInput.value;
  element.querySelector('.element__title').textContent = titleInput.value;
  elements.prepend(element);
}

// Функция подтверждения формы загрузки карточки
function formSubmitCard(evt) {
  evt.preventDefault();
  addCard();
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
formElement.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', formSubmitCard);

// Добавление карточек через js
for (let i = 0; i < initialCards.length; i++) {
  addCardsBlock(i);
}