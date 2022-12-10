// Переменные и постоянные

const formElement = document.querySelector('.form');
const nameInput = document.querySelector('input[name=name]');
const jobInput = document.querySelector('input[name=job]');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButton = document.querySelectorAll('.form__close-button');
let submitButton = document.querySelectorAll('.form__submit-button');
let likeButtons = document.querySelectorAll('.element__like');

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