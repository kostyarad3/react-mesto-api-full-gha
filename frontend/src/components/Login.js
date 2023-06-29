import React from "react";
import useFormWithValidation from "../hooks/useFormWithValidation";

function Login({ handleLogin }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = values;
    handleLogin(email, password);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-form__title">Вход</h3>
      <input
        type="email"
        className="login-form__input"
        name="email"
        id="email"
        required
        minLength="3"
        maxLength="40"
        placeholder="Email"
        value={values?.email || ""}
        onChange={handleChange}
      />
      <span className="login-form__input-error">
        {errors?.email && "Введите адрес электронной почти."}
      </span>
      <input
        type="password"
        className="login-form__input"
        name="password"
        id="password"
        required
        minLength="6"
        maxLength="40"
        placeholder="Пароль"
        value={values?.password || ""}
        onChange={handleChange}
      />
      <span className="login-form__input-error">
        {errors?.password && "Пароль должен быть длиннее 6 символов."}
      </span>
      <button 
        disabled={!isValid} 
        className={`button login-form__button ${!isValid && 'login-form__button_type_inactive'}`}
      >
        Войти
      </button>
    </form>
  );
}
export default Login;
