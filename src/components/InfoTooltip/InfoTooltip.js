import React from "react";

function InfoTooltip(props) {
  return (
    <div
      className={
        props.isOpen ? `popup popup_opened popup_notification` : `popup `
      }
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="закрыть"
          className="popup__exit"
          onClick={props.onClose}
        ></button>
        <div className="popup__note-container">
          <img
            className="popup__forbidden-symbol"
            src={props.image}
            alt="символ"
          />
          <h2 className="popup__title popup__title_note">{props.text}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
