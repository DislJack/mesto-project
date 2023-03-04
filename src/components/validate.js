// Функция отображения сообщения об ощибке
function showInputError(element, error, config) {
  const errorMessage = document.querySelector(`.${element.id}-error`);
  errorMessage.classList.add(config.errorClass);
  errorMessage.textContent = error;
  element.classList.add(config.inputErrorClass);
}

// Функция удаления сообщения об ошибке
function hideInputError(element, config) {
  const errorMessage = document.querySelector(`.${element.id}-error`);
  errorMessage.classList.remove(config.errorClass);
  errorMessage.textContent = '';
  element.classList.remove(config.inputErrorClass);
}

// Функция проверки валидности поля ввода
function isValid(input, config) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error);
  } else if (!input.value.length) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, config);
  } else {
    hideInputError(input, config);
  }
}

// Функция проверки всех полей ввода
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

// Функция деактивации кнопки
function toggleButtonState(inputList, submitButton, config) {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  }
}

// Функция добавления слушателей на каждое поле ввода
function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, submitButton, config);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(input, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });
}

// Функция валидации формы
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
}

export {enableValidation, toggleButtonState};