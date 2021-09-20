import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser.userId;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = isOwn ? "trash" : "trash trash_hidden";
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser.userId);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = isLiked ? "like like_active" : "like";

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="place">
      <img
        className="place__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        aria-label="удалить"
        type="button"
        onClick={handleCardDelete}
      ></button>
      <div className="place__info">
        <h2 className="place__name">{props.card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            aria-label="нравится"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <div className="likesCounter">
            {props.card.likes.length === 0 ? null : props.card.likes.length}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
