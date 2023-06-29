function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_place ${card.name ? "popup_opened" : ""}`}
    >
      <figure className="popup__content">
        <img
          src={card.name ? card.link : ""}
          alt={card.name ? card.name : ""}
          className="popup__image"
        />
        <figcaption className="popup__caption">
          {card ? card.name : ""}
        </figcaption>
        <button
          onClick={onClose}
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
        ></button>
      </figure>
    </div>
  );
}

export default ImagePopup;
