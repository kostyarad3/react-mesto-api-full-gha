import React from "react";

function Login({ handleLogin }) {
  const [values, setValues] = React.useState({});

  function handleChange(event) { 
    const { name, value } = event.target;
      setValues(arr => ({ ...arr, [name]: value })) 
  } 
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
        onChange={handleChange}
      />
      <span className="login-form__input-error">
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
        onChange={handleChange}
      />
      <span className="login-form__input-error">
      </span>
      <button 
        className={`button login-form__button`}
      >
        Войти
      </button>
    </form>
  );
}
export default Login;
