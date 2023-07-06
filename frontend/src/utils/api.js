class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
    this._credentials = config.credentials;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Где-то ошибочка:( : ${response.status}`);
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then((response) => this._getResponseData(response));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then((response) => this._getResponseData(response));
  }

  editUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((response) => this._getResponseData(response));
  }

  addNewCard(cardName, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((response) => this._getResponseData(response));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    }).then((response) => this._getResponseData(response));
  }

  giveLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      credentials: this._credentials,
    }).then((response) => this._getResponseData(response));
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    }).then((response) => this._getResponseData(response));
  }

  editUserAvatar(value) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        avatar: value,
      }),
    }).then((response) => this._getResponseData(response));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.giveLike(cardId);
  }
}


const api = new Api({
  baseUrl: "https://api.mesto.kostyarad.nomoreparties.sbs",
  credentials: "include",
  //baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default api;
