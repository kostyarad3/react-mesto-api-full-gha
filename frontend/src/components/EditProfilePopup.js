import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormWithValidation from "../hooks/useFormWithValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    setValues,
    handleChange,
    setIsValid,
    resetForm,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
      setValues({ name: currentUser.name, about: currentUser.about });
      setIsValid(true);
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        name="name"
        type="text"
        className="form__input"
        id="profile-name"
        value={values?.name || ""}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span
        className="form__input-error form__input-error_active"
      >
        {errors?.name && "Текст не должен быть короче 2 и длиннее 40 симв."}
      </span>
      <input
        type="text"
        name="about"
        className="form__input"
        id="profile-job"
        value={values?.about || ""}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span
        className="form__input-error form__input-error_active"
      >
        {errors?.about && "Текст не должен быть короче 2 и длиннее 40 симв."}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;