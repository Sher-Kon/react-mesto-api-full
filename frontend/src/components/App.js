import React from 'react';

import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmPopup from './ConfirmPopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api.js';
import apiSign from '../utils/apiSign';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

  const history = useHistory();

  const [isEmall, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  const [isToken, setToken] = React.useState("");

  React.useEffect(() => {
    // Проверка токена
    const jwt = localStorage.getItem("JWT"); //  была внутренняя переменная const
    if (jwt) {
      apiSign.checkToken(jwt).then((dataRet) => {
        setToken(jwt); // сделать токен общедоступным
        setEmail(dataRet.email); //dataRet.data.email
        setLoggedIn(true);
        // Запросы на получение данных профиля и списка карточек
        api.readProfile(jwt).then((retUser) => {
          setCurrentUser(retUser)
        }).catch((err) => alert(err));
        api.getInitialCards(jwt).then((retCards) => {
          setCards(retCards.cards)
        }).catch((err) => alert(err));
        // откроем cards
        history.push("/");
      }).catch((err) => alert(err))
    }
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);// i._id ===
    // console.log("лайкнули");
    // console.dir(card);
    // console.log("мой id:");
    // console.dir(currentUser._id);
    isLiked
      ? api.delLike(card._id, card.token).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => alert(err))
      : api.setLike(card._id, card.token).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => alert(err));
  }

  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipOk, setInfoTooltipOk] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [delCard, setDelCard] = React.useState({ title: '', link: '' });

  function handleCardDelete(card) {
    setDelCard(card);
    setConfirmPopupOpen(true);
  }

  function handleConfirm() {
    api.deleteCard(delCard._id, card.token).then(() => {
    console.log("Удаляем карточку");
    console.dir(delCard._id);
    const newCards = cards.filter(card => card._id !== delCard._id);
      setCards(newCards);
      setConfirmPopupOpen(false);
    }).catch((err) => alert(err));
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setInfoTooltipOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({ title: '', link: '' });
  }

  const [selectedCard, setSelectedCard] = React.useState({ title: '', link: '' });
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    const data = { name: '', about: '' };
    data.name = name;
    data.about = about;
    api.writeProfile(data).then((dataRet) => {
      setCurrentUser(dataRet);
      setEditProfilePopupOpen(false);
    }).catch((err) => alert(err));
  }

  function handleUpdateAvatar(link) {
    api.writeAvatar(link.avatar).then((dataRet) => {
      setCurrentUser(dataRet);
      setEditAvatarPopupOpen(false);
    }).catch((err) => alert(err));
  }

  function handleAddPlace(card, token) {
    // console.log("Добавили карточку");
    // console.dir(card);
    // console.dir(token);
    api.writeCard(card, token).then((newCard) => {
      setCards([newCard, ...cards]);
      setAddPlacePopupOpen(false);
    }).catch((err) => alert(err));
  }
  // РЕГИСТРАЦИЯ
  function onRegister({ password, email }) {
    setLoggedIn(false);
    localStorage.removeItem("JWT");
    // Запрс на регистрацию 
    const data = { password: '', email: '' };
    data.password = password;
    data.email = email;
    apiSign.register(data).then(() => {
      // запустим попап OK
      setInfoTooltipOpen(true);
      setInfoTooltipOk(true);
      // на авторизацию
      history.push("/sign-in");
    }).catch((err) => {
      // запустим попап ERR
      setInfoTooltipOpen(true);
      setInfoTooltipOk(false);
      // на авторизацию
      history.push("/sign-in");
      alert(err)
    })
  }
  // АВТОРИЗАЦИЯ
  function onLogin({ password, email }) {
    const data = { password: '', email: '' };
    data.password = password;
    data.email = email;
    // Запрс на авторизацию получение токена
    apiSign.logo(data).then((dataRet) => {
      // console.dir(dataRet);
      // console.log("then 1");
      let jwt = dataRet.token;
      setToken(jwt);
      localStorage.setItem("JWT", jwt);
      setLoggedIn(true);
      setTimeout(() => {
        // Проверка токена
        apiSign.checkToken(jwt).then((dataRet) => {
          // console.dir(dataRet);
          // console.log("then 2 jwt");
          setEmail(dataRet.email); // dataRet.data.email
          // Запросы на получение данных профиля и списка карточек
          api.readProfile(jwt).then((retUser) => {
            // console.dir(retUser);
            // console.log("then 3 retUser");
            setCurrentUser(retUser)
          }) // .catch((err) => console.log("catch 3")); // alert(err));
          api.getInitialCards(jwt).then((retCards) => {
            // console.dir(retCards.cards);
            // console.log("then 4 retCards");
            setCards(retCards.cards)
          }) // .catch((err) => console.log("catch 4"));// alert(err));
          // откроем cards
          history.push("/");
        }) // .catch((err) => {
          // console.log("catch 2") // alert(err)
         // });
      }, 500);
    }).catch((err) => {
        alert(err)
      // console.log("catch 1");
      // console.dir(err);
    });
  }

  function onSignOut() {
    //console.log("Click EXIT");
    setLoggedIn(false);
    localStorage.removeItem("JWT");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <div className="content">
            <Switch>
              <ProtectedRoute
                exact path="/"
                loggedIn={loggedIn}
                component={Main}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                email={isEmall}
                token={isToken}
                onExit={onSignOut}
              />
              <Route path="/sign-up">
                <Register
                  onRegisterUser={onRegister}
                />
              </Route>
              <Route path="/sign-in">
                <Login
                  onLoginUser={onLogin}
                />
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
          </div>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            token={isToken}
          />

          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleConfirm}
          />

          <ImagePopup
            cardIMG={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isOk={isInfoTooltipOk}
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
