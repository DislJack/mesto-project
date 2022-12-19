// Переменные и постоянные

const formElement = document.querySelector('form[name=form]');
const nameInput = document.querySelector('input[name=name]');
const jobInput = document.querySelector('input[name=job]');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.form__close-button');
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
  console.log(initialCards);

// Функции
// Функция открытия popup контейнеров
function popupOpened(index) {
  let popupOpened = document.querySelectorAll('.popup');
  if (popupOpened[index].classList.contains('popup_opened') === true) {
    popupOpened[index].classList.remove('popup_opened');
  } else {
    popupOpened[index].classList.add('popup_opened');
  }
}

// Функция настройки ввода формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = document.querySelector('.profile__heading-name');
  let job = document.querySelector('.profile__job');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}

// Функция добавления карточки
function addCard() {
  const elementTemplate = document.querySelector('#element').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt = element.closest('.element');
    evt.remove();
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
}

// Логика управления элементами
// Открыли popup контейнеры
editButton.addEventListener('click', () => {
  popupOpened(0);
}, false);
addButton.addEventListener('click', () => {
  popupOpened(1);
}, false);

// Кнопки закрыть на popup контейнерах
closeButton[0].addEventListener('click', () => {
  popupOpened(0);
}, false);
closeButton[1].addEventListener('click', () => {
  popupOpened(1);
}, false)

// Изменение данных в форме при сохранении формы
formElement.addEventListener('submit', formSubmitHandler);
formCard.addEventListener('submit', formSubmitCard);

// Кнопки подтвердить отправку форму на закрытие
submitButton[0].addEventListener('click', () => {
  popupOpened(0);
}, false);
submitButton[1].addEventListener('click', () => {
  popupOpened(1);
}, false)

// Меняем цвет лайк кнопки
for (i = 0; i < likeButtons.length; i++) {
  let index = i;
  likeButtons[i].addEventListener('click', () => {
    if (likeButtons[index].classList.contains('element__like_active') === true) {
      likeButtons[index].classList.remove('element__like_active');
    } else {
      likeButtons[index].classList.add('element__like_active');
    }
  });
}

for (let i = 0; i < deleteButton.length; i++) {
  let index = i;
  deleteButton[i].addEventListener('click', () => {
    const element = deleteButton[index].closest('.element');
    element.remove();
  });
}