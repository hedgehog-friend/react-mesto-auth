import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import forbidden from "../../images/symbols_logo/forbidden.png";

const Login = ({ onLogin, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [imageInfoTooltip, setImageInfoTooltip] = useState("");
  const [textInfoTooltip, setTextInfoTooltip] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ email, password })
      .then(resetForm)
      .then(() => {
        history.push("/user");
      })
      .catch((err) => {
        console.log(err);
        setImageInfoTooltip(forbidden);
        setTextInfoTooltip("Что-то пошло не так. Попробуйте еще раз.");
        setIsOpen(true);
      });
  };

  const onPopupClosed = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/user");
    }
  }, []);

  return (
    <>
      <Header>
        <Link to="sign-up" className="header__enter-link">
          Регистрация
        </Link>
      </Header>
      <div className="login">
        <form className="login-form" name="login__form" onSubmit={handleSubmit}>
          <h2 className="login-form__title">Вход</h2>
          <fieldset className="login-form__input-container">
            <input
              type="email"
              id="login-email"
              name="login-email"
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
              id="login-password"
              name="login-password"
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
            Войти
          </button>
        </form>
      </div>
      <InfoTooltip
        onClose={onPopupClosed}
        isOpen={isOpen}
        image={imageInfoTooltip}
        text={textInfoTooltip}
      />
    </>
  );
};

export default Login;
