const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: '9f08c228-ad32-46bd-930f-3baca199438b',
    'Content-Type': 'application/json'
  }
}

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
}

function getInformationAboutMe() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    })
}

function updateInformationAboutMe(newName, newJob) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newJob
    })
  })
    .catch(err => {
      console.log(err);
    })
}

function publishNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
    .catch(err => {
      console.log(err);
    })
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .catch(err => {
      console.log(err);
    })
}

function putLikeOnCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .catch(err => {
      console.log(err);
    })
}

function deleteLikeOnCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .catch(err => {
      console.log(err);
    })
}

function updateAvatar(avatarPicture) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarPicture
    })
  })
    .catch(err => {
      console.log(err);
    })
}

function renderLoadingCard(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Создать';
  }
}

function renderLoadingUpdate(button, isLoading) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

export {getInitialCards, getInformationAboutMe, updateInformationAboutMe, publishNewCard, deleteCard, putLikeOnCard, deleteLikeOnCard, updateAvatar, renderLoadingCard, renderLoadingUpdate};