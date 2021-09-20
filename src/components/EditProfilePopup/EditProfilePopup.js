import { useState, useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userDescription);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          type="text"
          id="name-profile"
          name="name-profile"
          className="popup__form-item popup__form-item_el_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          value={name}
        />
        <span className="popup__input-error" id="name-profile-error"></span>
        <input
          type="text"
          id="description-profile"
          name="description-profile"
          className="popup__form-item popup__form-item_el_description"
          placeholder="Комментарий"
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description}
          required
        />
        <span
          className="popup__input-error"
          id="description-profile-error"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
