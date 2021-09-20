import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import api from "../../utils/Api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import * as apiAuth from "../../utils/apiAuth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    userId: "",
  });

  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState({});
  const auth = async (jwt) => {
    return apiAuth.getContent(jwt).then((res) => {
      if (res) {
        setLoggedIn(true);
        setEmail({
          email: res.email,
        });
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) history.push("/user");
  }, [loggedIn]);

  const onRegister = ({ password, email }) => {
    return apiAuth.register(password, email).then((res) => {
      if (!res || res.statusCode === 400)
        throw new Error("Что-то пошло не так");
      return res;
    });
  };

  const onLogin = ({ password, email }) => {
    return apiAuth.authorize(password, email).then((res) => {
      if (!res) throw new Error("Неправильные имя пользователя или пароль");
      if (res.token) {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
      }
    });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  function handleCardClick(idCard) {
    setSelectedCard(idCard);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(userData) {
    api
      .updateUser(userData)
      .then((userData) => {
        setCurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateavatar(userData) {
    return api
      .updateAvatar(userData)
      .then((userData) => {
        setCurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  function handleAddPlace(placeData) {
    return api
      .createCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser.userId);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  }
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body">
        <Header />

        <Router>
          <Switch>
            <ProtectedRoute
              exact
              path="/user"
              loggedIn={loggedIn}
              onSignOut={onSignOut}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              card={selectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route exact path="/sign-in">
              <div className="loginContainer">
                <Login onLogin={onLogin} />
              </div>
            </Route>
            <Route exact path="/sign-up">
              <div className="registerContainer">
                <Register onRegister={onRegister} />
              </div>
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/user" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </Router>

        <Footer />

        {/* <!-- Модальное окно для редактирования профиля --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* <!-- Модальное окно для изменения аватара --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateavatar}
        />

        {/* <!-- Модальное окно для добавления места --> */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        {/* <!-- Модальное окно для просмотра изображения --> */}
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        {/* <!-- Модальное окно для подтверждения удаления --> */}
        <PopupWithForm
          name="confirm-deletion"
          title="Вы уверены?"
          buttonName="Да"
          isOpen={false}
        ></PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
