import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const avatarLinkRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();

    props
      .onUpdateAvatar({
        avatar: avatarLinkRef.current.value,
      })
      .then(() => {
        avatarLinkRef.current.value = "";
      });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          type="url"
          id="avatar-link"
          name="link"
          className="popup__form-item popup__form-item_el_description"
          placeholder="Введите ссылку"
          ref={avatarLinkRef}
          required
        />
        <span className="popup__input-error" id="avatar-link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
