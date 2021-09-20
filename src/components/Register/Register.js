import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Register = ({ onRegister, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [message, setMessage] = useState("");
  const history = useHistory();

  const resetForm = () => {
    setEmail("");
    setPassword("");

    // setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onRegister({ password, email })
      .then(resetForm)
      .then(() => history.push("/sign-in"))
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
    <div className="register">
      {/* <h1 className="login-title">Регистрация</h1> */}
      <form
        className="login__form"
        name="register__form"
        onSubmit={handleSubmit}
      >
        <h2 className="login-form__title">
          {/* {props.title} */}
          Регистрация
        </h2>
        <fieldset className="login-form__input-container">
          <input
            type="email"
            id="register-email"
            name="register-email"
            className="login-form__item"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <span className="popup__input-error" id="name-profile-error"></span> */}
          <input
            type="password"
            id="register-password"
            name="register-password"
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
          Зарегистрироваться
        </button>
        <Link to="sign-in" className="register__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;
