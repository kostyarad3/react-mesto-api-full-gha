import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    if (isOpen) {
      setValues({ avatarLink: currentUser.avatar });
    }
  }, [currentUser, isOpen]);

  const [values, setValues] = React.useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

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
    >
      <input
        type="url"
        className="form__input"
        name="avatarLink"
        id="avatar-link"
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required
        value={values.avatarLink || ""}
      />
      <span className="form__input-error form__input-error_active"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
