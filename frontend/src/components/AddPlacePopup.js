import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [values, setValues] = React.useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.cardName,
      link: values.cardLink,
    });
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input"
        name="cardName"
        value={values?.cardName || ""}
        onChange={handleChange}
        id="card-name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="form__input-error form__input-error_active"></span>
      <input
        type="url"
        className="form__input"
        name="cardLink"
        value={values?.cardLink || ""}
        onChange={handleChange}
        id="card-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__input-error form__input-error_active"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
