// Функция открытия popup контейнеров
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия popup контейнеров
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export {openPopup, closePopup};