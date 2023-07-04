import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";



function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onTrashClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => (
    <li key={card._id} className="place">
      <Card
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onTrashClick={onTrashClick}
      />
    </li>
  ));

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__photo">
          <img
            src={currentUser.avatar}
            alt="Фотография пользователя"
            className="profile__avatar"
          />
          <button
            onClick={onEditAvatar}
            className="button profile__avatar-button"
          ></button>
        </div>
        <div className="profile__content">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__info">{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            className="button button_type_edit"
            type="button"
            aria-label="Редактировать"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          className="button button_type_add"
          type="button"
          aria-label="Добавить"
        ></button>
      </section>
      <section className="cards">
        <ul className="places">{cardsElements}</ul>
      </section>
    </main>
  );
}

export default Main;
