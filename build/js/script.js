'use strict';
(function () {
  var modal = document.querySelector('.modal');
  var callMeBackButton = document.querySelector('.page-header__callback');
  var modalForm = document.querySelector('.modal__form');
  var questionsForm = document.querySelector('.questions__form');
  var modalPopup = document.querySelector('.modal__popup');
  var pageBody = document.querySelector('body');
  var storage = window.localStorage;

  var openModal = function (modalItem, evt) {
    evt.preventDefault();
    if (modalItem) {
      modalItem.classList.add('modal--show');
      pageBody.classList.add('modal-overlay');
      var closeModalButton = modalItem.querySelector('.modal__close');
      var modalOverlay = modalItem.querySelector('.modal__overlay');
      var userNameField = modalItem.querySelector('.modal__item--username input');
      var userPhone = modalItem.querySelector('.modal__item--tel input');
      var userQuestion = modalItem.querySelector('.modal__item--user-question textarea');

      if (storage.name || storage.tel) {
        userNameField.value = storage.getItem('name');
        userPhone.value = storage.getItem('tel');
        userQuestion.focus();
      } else {
        userNameField.focus();
      }
      closeModalButton.addEventListener('click', onCloseButtonPress);
      modalOverlay.addEventListener('click', onOverlayClick);
      window.addEventListener('keydown', onEscKeyPress);
    }
  };

  var closeModal = function () {
    modal.classList.remove('modal--show');
    pageBody.classList.remove('modal-overlay');
    var modalOverlay = modal.querySelector('.modal__overlay');
    var closeModalButton = modal.querySelector('.modal__close');
    closeModalButton.removeEventListener('click', onCloseButtonPress);
    modalOverlay.removeEventListener('click', onOverlayClick);

    window.removeEventListener('keydown', onEscKeyPress);
  };

  var onModalSubmit = function (evt) {
    var tel = evt.target.querySelector('.modal__item--tel input');
    var name = evt.target.querySelector('.modal__item--username input');
    var question = evt.target.querySelector('.modal__item--user-question textarea');
    if (tel.value && name.value && question.value !== '') {
      evt.preventDefault();
      storage.setItem('tel', tel.value);
      storage.setItem('name', name.value);
      closeModal();
    } else {
      modalPopup.classList.add('modal__popup--invalid');
      setTimeout(function () {
        modalPopup.classList.remove('modal__popup--invalid');
      }, 820);
    }
  };

  var onQuestionSubmit = function (evt) {
    var tel = evt.target.querySelector('.questions__item--tel input');
    var name = evt.target.querySelector('.questions__item--username input');
    var agreement = evt.target.querySelector('.questions__item input[type="checkbox"]');
    if (tel.value === '') {
      evt.preventDefault();
      tel.parentNode.classList.add('page-form__item--invalid');
    }
    if (name.value === '') {
      evt.preventDefault();
      name.parentNode.classList.add('page-form__item--invalid');
    }
    if (!agreement.checked) {
      evt.preventDefault();
      agreement.parentNode.classList.add('page-form__item--invalid');
    }
  };

  var onModalOpen = function (evt) {
    openModal(modal, evt);
  };

  var onCloseButtonPress = function () {
    closeModal();
  };

  var onOverlayClick = function (evt) {
    if (evt.target.matches('.modal__overlay')) {
      closeModal();
    }
  };

  var onEscKeyPress = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closeModal();
    }
  };

  if (callMeBackButton) {
    callMeBackButton.addEventListener('click', onModalOpen);
  }

  if (modalForm) {
    modalForm.addEventListener('submit', onModalSubmit);
  }

  if (questionsForm) {
    questionsForm.addEventListener('submit', onQuestionSubmit);
  }
})();

(function () {
  function setCursorPosition(pos, elem) {
    elem.focus();
    elem.setSelectionRange(pos, pos);
  }

  function mask(event) {
    var matrix = '+7 (___) ___ ____';
    var i = 0;
    var def = matrix.replace(/\D/g, '');
    var val = event.target.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    event.target.value = matrix.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else {
        if (i >= val.length) {
          return '';
        } else {
          return a;
        }
      }
    });
    if (event.type === 'blur') {
      if (event.target.value.length === 2) {
        event.target.value = '';
      }
    } else {
      setCursorPosition(event.target.value.length, event.target);
    }
  }
  var questionPhone = document.querySelector('.questions__item--tel input');
  var popupPhone = document.querySelector('.modal__item--tel input');

  if (questionPhone) {
    questionPhone.addEventListener('input', mask, false);
    questionPhone.addEventListener('focus', mask, false);
    questionPhone.addEventListener('blur', mask, false);
  }

  if (popupPhone) {
    popupPhone.addEventListener('input', mask, false);
    popupPhone.addEventListener('focus', mask, false);
    popupPhone.addEventListener('blur', mask, false);
  }
})();

(function () {
  var siteSectionToggle = document.querySelector('.site-sections__wrapper');
  var officesToggle = document.querySelector('.offices__wrapper');

  var siteSection = document.querySelector('.site-sections');
  var offices = document.querySelector('.offices');

  siteSection.classList.remove('site-sections--nojs');
  offices.classList.remove('offices--nojs');

  siteSectionToggle.addEventListener('click', function () {
    siteSection.classList.toggle('site-sections--opened');
    if (offices.classList.contains('offices--opened')) {
      offices.classList.toggle('offices--opened');
    }
  });

  officesToggle.addEventListener('click', function () {
    offices.classList.toggle('offices--opened');

    if (siteSection.classList.contains('site-sections--opened')) {
      siteSection.classList.toggle('site-sections--opened');
    }
  });
})();
