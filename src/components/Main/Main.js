import { useContext } from "react";
import pencil from "../../images/symbols_logo/pencil.svg";
import symbolAdd from "../../images/symbols_logo/symbolAdd.svg";
import Card from "../Card/Card.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile body__container">
        <div className="profile__data">
          <div className="profile__avatar">
            <img
              className="profile__image"
              src={currentUser.userAvatar}
              alt="аватар профиля"
            />
            <div className="profile__image-hover" onClick={props.onEditAvatar}>
              <img
                className="profile__image-hover-symbol"
                src={pencil}
                alt="symbol"
              />
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__info-upper">
              <h1 className="profile__name">{currentUser.userName}</h1>
              <button
                className="profile__edit"
                aria-label="редактировать"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__description">
              {currentUser.userDescription}
            </p>
          </div>
        </div>
        <button
          className="place-edit"
          aria-label="добавить место"
          type="button"
          onClick={props.onAddPlace}
        >
          <img
            className="place-edit__symbol-add"
            src={symbolAdd}
            alt="кнопка добавить место"
          />
        </button>
      </section>

      <section>
        <ul className="places body__container">
          {props.cards.map(function (item) {
            return (
              <Card
                card={item}
                key={item._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
