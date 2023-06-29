import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onTrashClick }) {
  // STATES AND CONSTANTS
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button place__like ${
    isLiked && "place__like_active"
  }`;
  // FUNCTIONS
  function handleClick() {
    onCardClick(card);
  }
  function handleLike() {
    onCardLike(card);
  }
  function handleDelete() {
    onTrashClick(card);
  }

  return (
    <>
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="place__image"
      />
      {isOwn && (
        <button
          className="button place__delete"
          type="button"
          aria-label="Удалить"
          onClick={handleDelete}
        ></button>
      )}
      <div className="place__content">
        <h2 className="place__name">{card.name}</h2>
        <div className="place__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="place__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
