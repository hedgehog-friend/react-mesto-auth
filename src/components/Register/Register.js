import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header/Header.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";
import approved from "../../images/symbols_logo/approved.png";

const Register = ({ onRegister, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onRegister({ password, email })
      .then(resetForm)
      .then(() => setIsOpen(true))
      .catch((err) => {
        console.log(err);
      });
  };

  const onPopupClosed = () => {
    setIsOpen(false);
    history.push("/sign-in");
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/user");
    }
  }, []);

  return (
    <>
      <Header>
        <Link to="sign-in" className="header__enter-link">
          Вход
        </Link>
      </Header>
      <div className="register">
        <form
          className="login-form"
          name="register__form"
          onSubmit={handleSubmit}
        >
          <h2 className="login-form__title">Регистрация</h2>
          <fieldset className="login-form__input-container">
            <input
              type="email"
              id="register-email"
              name="register-email"
              className="login-form__input"
              placeholder="Email"
              value={email}
              minLength="4"
              maxLength="40"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="register-password"
              name="register-password"
              className="login-form__input"
              placeholder="Пароль"
              value={password}
              minLength="2"
              maxLength="40"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>
          <button type="submit" className="login-form__button-save">
            Зарегистрироваться
          </button>
          <Link to="sign-in" className="login-form__link-register">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>

      <InfoTooltip onClose={onPopupClosed} isOpen={isOpen}>
        <div className="popup__note-container">
          <img
            className="popup__forbidden-symbol"
            src={approved}
            alt="approved"
          />
          <h2 className="popup__title popup__title_note">
            Вы успешно зарегистрировались!
          </h2>
        </div>
      </InfoTooltip>
    </>
  );
};

export default Register;
