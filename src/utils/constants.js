const config = {
  inputSelector: ".popup__form-item",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__form-item_type_error",
  errorClass: "popup__input-error_active",
};

//находим кнопку редактирования профиля
const profileEdit = document.querySelector(".profile__edit");
//находим кнопку добавления карточки
const placeAdd = document.querySelector(".place-edit");

// Находим поля формы пользователя в DOM
const profileNameInput = document.querySelector("#name-profile");
const profileDescriptionInput = document.querySelector("#description-profile");

//Находим аватар пользователя
const profileAvatar = document.querySelector(".profile__image");
const profileAvatarClick = document.querySelector(".profile__avatar");

export {
  config,
  profileEdit,
  placeAdd,
  profileNameInput,
  profileDescriptionInput,
  profileAvatar,
  profileAvatarClick,
};
