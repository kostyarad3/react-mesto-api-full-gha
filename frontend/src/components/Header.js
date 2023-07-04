import headerLogo from "../images/header-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Header({ text, link, loggedIn, setLoggedIn, email }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("./sign-in", { replace: true });
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <img
        src={headerLogo}
        alt="Логотип социальной сети Место"
        className="header__logo"
      />
      <div className="header__info">
        <p className="header__email">{email}</p>
        <Link
          to={link}
          onClick={loggedIn ? signOut : ""}
          className={`${
            loggedIn ? "header__text_type_logged" : "header__text"
          }`}
        >
          {text}
        </Link>
      </div>
    </header>
  );
}

export default Header;
