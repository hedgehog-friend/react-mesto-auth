import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  // const namePlaceRef = useRef();
  // const linkPlaceRef = useRef();

  const [name, setName] = useState();
  const [link, setLink] = useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props
      .onAddPlace({
        link,
        name,
      })
      .then(() => {
        setName("");
        setLink("");
      });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          type="text"
          id="name-place"
          name="name-place"
          className="popup__form-item popup__form-item_el_name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChangeName}
          value={name}
        />
        <span className="popup__input-error" id="name-place-error"></span>
        <input
          type="url"
          id="link"
          name="link"
          className="popup__form-item popup__form-item_el_description"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChangeLink}
          value={link}
        />
        <span className="popup__input-error" id="link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
