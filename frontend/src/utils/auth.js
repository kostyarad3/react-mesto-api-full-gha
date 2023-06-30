export const BASE_URL = "https://api.mesto.kostyarad.nomoreparties.sbs";
//export const BASE_URL = "http://localhost:3000";

function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Где-то ошибочка:( : ${res.status}`);
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponseData(res));
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => getResponseData(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export function getContent(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwt}`
    },
  })
    .then((res) => getResponseData(res))
    .then((data) => data);
}
