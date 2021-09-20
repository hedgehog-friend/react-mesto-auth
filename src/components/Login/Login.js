import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ onLogin, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onLogin({ email, password })
      .then(resetForm)
      .then(() => history.push("/user"))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/user");
    }
  }, []);

  return (
    <div className="login">
      {/* <h1 className="login-title">Регистрация</h1> */}
      <form className="login__form" name="login__form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">
          {/* {props.title} */}
          Вход
        </h2>
        <fieldset className="login-form__input-container">
          <input
            type="email"
            id="login-email"
            name="login-email"
            className="login-form__item"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <span className="popup__input-error" id="name-profile-error"></span> */}
          <input
            type="password"
            id="login-password"
            name="login-password"
            className="login-form__item"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <span
              className="popup__input-error"
              id="description-profile-error" */}
          {/* ></span> */}
        </fieldset>
        <button type="submit" className="login__save">
          {/* {props.buttonName} */}
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
