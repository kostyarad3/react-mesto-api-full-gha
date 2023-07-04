/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltipSuccess from "../images/infotooltip-success.svg";
import InfoTooltipFailure from "../images/infotooltip-failure.svg";
import ConfirmaionPopup from "./ConfirmationPopup";

function App() {
  const navigate = useNavigate();
  // STATES
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [infoTooltipText, setInfoTooltipText] = React.useState("");
  const [infoTooltipImage, setiIfoTooltipImage] = React.useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmayionPopupOpen] =
    React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState("");
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  // EFFECTS
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getInitialData()
        .then((data) => {
          const [userData, initialCardsData] = data;
          setCurrentUser(userData.user);
          setCards(initialCardsData.data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);
  // close popup by ESC press and overlay click
  React.useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isConfirmationPopupOpen ||
      selectedCard ||
      isInfoTooltipPopupOpen
    ) {
      function handleEsc(evt) {
        if (evt.key === "Escape") {
          closeAllPopups();
        }
      }
      function handleOverlayClick(evt) {
        if (evt.target.classList.contains("popup_opened")) {
          closeAllPopups();
        }
      }

      document.addEventListener("click", handleOverlayClick);
      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.removeEventListener("click", handleOverlayClick);
      };
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
    isInfoTooltipPopupOpen,
    isConfirmationPopupOpen,
  ]);
  // FUNCTIONS
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleTrashIconClick(card) {
    setIsConfirmayionPopupOpen(true);
    setDeletedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setIsConfirmayionPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((newCard) => newCard._id !== card._id)
        );
        setIsConfirmayionPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(userInfo) {
    console.log(userInfo);
    api
      .editUserInfo(userInfo.name, userInfo.about)
      .then((updatedUserInfo) => {
        console.log(updatedUserInfo);
        setCurrentUser(updatedUserInfo.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(avatar) {
    api
      .editUserAvatar(avatar.avatar)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    console.log(newCard);
    api
      .addNewCard(newCard.name, newCard.link)
      .then((updatedCard) => {
        setCards([updatedCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setInfoTooltipText("Вы успешно зарегистрировались!");
        setiIfoTooltipImage(InfoTooltipSuccess);
        navigate("./sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setiIfoTooltipImage(InfoTooltipFailure);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(email);
          setInfoTooltipText("Вы успешно вошли!");
          setiIfoTooltipImage(InfoTooltipSuccess);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setInfoTooltipText("Что-то не так!");
        setiIfoTooltipImage(InfoTooltipFailure);
        console.log(err);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.user.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <>
                <Header text={"Регистрация"} link={"/sign-up"} />
                <Login handleLogin={handleLogin} />
              </>
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Header text={"Войти"} link={"/sign-in"} />
                <Register handleRegistration={handleRegistration} />
              </>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Header
                    text={"Выйти"}
                    link={"/sign-in"}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    email={userEmail}
                  />
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onTrashClick={handleTrashIconClick}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          />
          {/* can delete */}
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>
        {/* popup edit profile */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* popup add card */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* popup edit avatar */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* confirmation popup */}
        <ConfirmaionPopup
          isConfirmationPopupOpen={isConfirmationPopupOpen}
          handleCardDelete={handleCardDelete}
          card={deletedCard}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          name="infotooltip"
          text={infoTooltipText}
          image={infoTooltipImage}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
