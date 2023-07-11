import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
import useFormWithValidation from "../hooks/useFormWithValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.cardName,
      link: values.cardLink,
    });
  }

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
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
      <span className="form__input-error form__input-error_active">
        {errors?.cardName && "Текст не должен быть короче 2 и длиннее 30 симв."}
      </span>
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
      <span className="form__input-error form__input-error_active">
        {errors?.cardLink && "Введите адрес сайта"}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
