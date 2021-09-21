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
        {props.children}
      </div>
    </div>
  );
}

export default InfoTooltip;
