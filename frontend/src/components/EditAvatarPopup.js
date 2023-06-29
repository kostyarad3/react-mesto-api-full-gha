import PopupWithForm from "./PopupWithForm";
import React from "react";
import useFormWithValidation from "../hooks/useFormWithValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

  React.useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatarLink,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="url"
        className="form__input"
        name="avatarLink"
        id="avatar-link"
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__input-error form__input-error_active">
        {errors?.avatarLink &&
          "Введите адрес сайта."}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
