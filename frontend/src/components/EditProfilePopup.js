import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({});

  React.useEffect(() => {
    if (isOpen) {
      setValues({ name: currentUser.name, about: currentUser.about });
    }
  }, [currentUser, isOpen]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((arr) => ({ ...arr, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        className="form__input"
        id="profile-name"
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
        value={values.name || ""}
      />
      <span className="form__input-error form__input-error_active"></span>
      <input
        type="text"
        name="about"
        className="form__input"
        id="profile-job"
        onChange={handleChange}
        required
        minLength="2"
        maxLength="200"
        value={values.about || ""}
      />
      <span className="form__input-error form__input-error_active"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
