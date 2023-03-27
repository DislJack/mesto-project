// Функция открытия popup контейнеров
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => {
    closeByEscape(evt, popup);
  });
}

// функция закрытия popup контейнеров
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt, popup) => {
    closeByEscape(evt, popup);
  });
}

function closeByEscape(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function renderLoading(button, isLoading, buttonText, loadingText) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

export {openPopup, closePopup, renderLoading};