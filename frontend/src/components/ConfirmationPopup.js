import PopupWithForm from "./PopupWithForm";
import React from "react";

function ConfirmaionPopup({ isConfirmationPopupOpen, handleCardDelete, card, onClose }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    handleCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены"
      buttonTitle="Да"
      isOpen={isConfirmationPopupOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    ></PopupWithForm>
  );
}

export default ConfirmaionPopup;
