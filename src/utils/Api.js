const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

class Api {
  #baseUrl;
  #headers;

  constructor({ baseUrl, headers }) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  //загрузка карточек с сервера
  getInitialCards() {
    const url = `${this.#baseUrl}/cards`;
    return fetch(url, {
      headers: this.#headers,
    }).then(handleResponse);
  }

  //получение данных пользователя
  getUserData() {
    const url = `${this.#baseUrl}/users/me`;
    return fetch(url, {
      headers: this.#headers,
    }).then(handleResponse);
  }

  createCard(card) {
    const url = `${this.#baseUrl}/cards`;
    return fetch(url, {
      headers: this.#headers,
      method: "POST",
      body: JSON.stringify(card),
    }).then(handleResponse);
  }

  deleteCard(cardId) {
    const url = `${this.#baseUrl}/cards/${cardId}`;
    return fetch(url, {
      headers: this.#headers,
      method: "DELETE",
    }).then(handleResponse);
  }

  //метод для обновления инфы при редактировании данных профиля
  updateUser(user) {
    const url = `${this.#baseUrl}/users/me`;
    return fetch(url, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(user),
    }).then(handleResponse);
  }

  updateAvatar(user) {
    const url = `${this.#baseUrl}/users/me/avatar`;
    return fetch(url, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(user),
    }).then(handleResponse);
  }

  addLike(cardId) {
    const url = `${this.#baseUrl}/cards/likes/${cardId}`;
    return fetch(url, {
      method: "PUT",
      headers: this.#headers,
    }).then(handleResponse);
  }

  removeLike(cardId) {
    const url = `${this.#baseUrl}/cards/likes/${cardId}`;
    return fetch(url, {
      method: "DELETE",
      headers: this.#headers,
    }).then(handleResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.removeLike(cardId);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef",
    "Content-Type": "application/json",
  },
});
export default api;
