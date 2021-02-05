'use strict'

let modal = document.querySelector(".modal");
let callMeBackButton = document.querySelector(".page-header__callback");
let modalForm = document.querySelector(".modal__form");
let modalPopup = document.querySelector(".modal__popup");
let storage = window.localStorage;

let openModal = (modal) => {
  modal.classList.add("modal--show");
  let closeModalButton = modal.querySelector(".modal__close");
  let modalOverlay = modal.querySelector(".modal__overlay");
  let userNameField = modal.querySelector(".modal__field--username");
  let userPhone = modal.querySelector(".modal__field--tel");
  let userQuestion = modal.querySelector(".modal__user-question");

  if (storage.name || storage.tel) {
    userNameField.value = storage.getItem("name");
    userPhone.value = storage.getItem("tel");
    userQuestion.focus();
  } else {
    userNameField.focus();
  }
  closeModalButton.addEventListener("click", onCloseButtonPress);
  modalOverlay.addEventListener("click", onOverlayClick);
  window.addEventListener("keydown", onEscKeyPress);
}

let closeModal = () => {
  modal.classList.remove("modal--show");
  let modalOverlay = modal.querySelector(".modal__overlay");
  let closeModalButton = modal.querySelector(".modal__close");
  closeModalButton.removeEventListener("click", onCloseButtonPress);
  modalOverlay.removeEventListener("click", onOverlayClick);

  window.removeEventListener("keydown", onEscKeyPress);
}

let onModalSubmit = (evt) => {
  let tel = evt.target.querySelector(".modal__field--tel");
  let name = evt.target.querySelector(".modal__field--username");
  let question = evt.target.querySelector(".modal__user-question");
  if (tel.value && name.value && question.value !== '') {
    evt.preventDefault();
    storage.setItem("tel", tel.value);
    storage.setItem("name", name.value);
    closeModal();
  } else {
    modalPopup.classList.add("modal__popup--invalid");
    setTimeout(() => {
      modalPopup.classList.remove("modal__popup--invalid");
  }, 820)
  }
};

let onModalOpen = () => {
  openModal(modal);
};

let onCloseButtonPress = () => {
  closeModal();
}

let onOverlayClick = (evt) => {
  if (evt.target.matches(".modal__overlay")) {
    closeModal();
  }
}

let onEscKeyPress = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeModal();
  };
};

callMeBackButton.addEventListener("click", onModalOpen);
modalForm.addEventListener("submit", onModalSubmit);

//-------

function setCursorPosition(pos, elem) {
  elem.focus();
  if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
  else if (elem.createTextRange) {
    let range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select()
  }
}

function mask(event) {
  let matrix = "+7 (___) ___ ____",
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, "");
  if (def.length >= val.length) val = def;
  this.value = matrix.replace(/./g, function (a) {
    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
  });
  if (event.type == "blur") {
    if (this.value.length == 2) this.value = ""
  } else setCursorPosition(this.value.length, this)
};
let questionPhone = document.querySelector(".question__field--tel");
questionPhone.addEventListener("input", mask, false);
questionPhone.addEventListener("focus", mask, false);
questionPhone.addEventListener("blur", mask, false);

let popupPhone = document.querySelector(".modal__field--tel");
popupPhone.addEventListener("input", mask, false);
popupPhone.addEventListener("focus", mask, false);
popupPhone.addEventListener("blur", mask, false);

//--------

let siteSectionToggle = document.querySelector(".site-sections__toggle");
let officesToggle = document.querySelector(".offices__toggle");

let siteSection = document.querySelector(".site-sections");
let offices = document.querySelector(".offices");

siteSectionToggle.addEventListener("click", () => {
  siteSection.classList.toggle("site-sections--opened");
});

officesToggle.addEventListener("click", () => {
  offices.classList.toggle("offices--opened");
});
