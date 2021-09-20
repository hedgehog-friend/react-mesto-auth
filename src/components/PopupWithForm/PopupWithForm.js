import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_opened popup_type_${props.name}`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container">
        <form
          className="popup__form"
          name={`form-${props.name}`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save">
            {props.buttonName}
          </button>
          <button
            type="button"
            aria-label="закрыть"
            className="popup__exit"
            onClick={props.onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
