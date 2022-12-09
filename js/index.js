/* Разработка логики модальных окон */
// Открытие popup контейнера по клику

function popupOpened() {
  let popupOpened = document.querySelector('.popup');
  if (popupOpened.classList.contains('popup_opened') === true) {
    popupOpened.classList.remove('popup_opened');
  } else {
    popupOpened.classList.add('popup_opened');
  }
}

let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', popupOpened);

// Закрытие popup контейнера по клику

let closeButton = document.querySelector('.form__close-button');
closeButton.addEventListener('click', popupOpened);

// Изменение данных в форме при сохранении формы

const formElement = document.querySelector('.form');
const nameInput = document.querySelector('input[name=name]');
const jobInput = document.querySelector('input[name=job]');

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = document.querySelector('.profile__heading-name');
  let job = document.querySelector('.profile__job');
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
let submitButton = document.querySelector('.form__submit-button');
submitButton.addEventListener('click', popupOpened);

// Функция описания смены цвета лайк элемента

let likeButtons = document.querySelectorAll('.element__like');
let index = 0;

for (i = 0; i < likeButtons.length; i++) {
  let index = i;
  likeButtons[i].addEventListener('click', () => { // тут проблема с i оно не передаётся
    if (likeButtons[index].classList.contains('element__like_active') === true) {
      likeButtons[index].classList.remove('element__like_active');
    } else {
      likeButtons[index].classList.add('element__like_active');
    }
  });
}