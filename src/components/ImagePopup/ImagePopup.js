import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_opened popup_type_${props.name}`
          : `popup popup_type_${props.name}`
      }
    >
      <div className="popup__container-image">
        <button
          type="button"
          aria-label="закрыть"
          className="popup__exit popup__exit_location_image"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__wide-image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup__name-wide-image">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
