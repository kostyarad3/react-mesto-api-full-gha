import headerLogo from "../images/header-logo.svg";
import closeIcon from "../images/Close_Icon.svg";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import useWindowWidth from "../hooks/useWindowWidth";

function Header({ text, link, loggedIn, setLoggedIn, email }) {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  const [isInfoOpen, setIsInfoOpen] = React.useState(false);

  function handleInfoOpen() {
    setIsInfoOpen(!isInfoOpen);
  }

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("./sign-in", { replace: true });
    setLoggedIn(false);
  }

  return windowWidth >= 630 ? (
    <>
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
    </>
  ) : (
    <>
      <header className="header">
        <div className={`header__info ${isInfoOpen && "header__info_active"}`}>
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
        <div className="header__images">
          <img
            src={headerLogo}
            alt="Логотип социальной сети Место"
            className="header__logo"
          />
          {!loggedIn ? (
            <Link
              to={link}
              onClick={loggedIn ? signOut : ""}
              className={`${
                loggedIn ? "header__text_type_logged" : "header__text"
              }`}
            >
              {text}
            </Link>
          ) : (
            <>
              {" "}
              {isInfoOpen ? (
                <img
                  className="header__close-info"
                  src={closeIcon}
                  onClick={handleInfoOpen}
                  alt="Кнопка закрытия"
                />
              ) : (
                <div className="burger-menu" onClick={handleInfoOpen}>
                  <span className="burger-menu__item"></span>
                  <span className="burger-menu__item"></span>
                  <span className="burger-menu__item"></span>
                </div>
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
