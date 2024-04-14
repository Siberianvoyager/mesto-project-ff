import './pages/index.css';
import initialCards from './scripts/cards.js'; 

// @todo: Темплейт карточки  
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// Функция для лайка карточки
function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция создания карточки
function createCard(data, deleteCallback, likeCallback) { 
    const card = cardTemplate.content.cloneNode(true).querySelector('.places__item');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(card);
    });

   // Добавляем обработчик события для лайка карточки
const cardLikeButton = card.querySelector('.card__like-button');
cardLikeButton.addEventListener('click', () => {
    likeCallback(cardLikeButton); // Передаем кнопку лайка карточки
    likeCard(cardLikeButton); // Вызываем функцию лайка карточки
});


    return card;
}

// Добавляем обработчик для контейнера с карточками, чтобы использовать делегирование событий
placesList.addEventListener('click', function(event) {
    const likeButton = event.target.closest('.card__like-button');
    if (likeButton) {
        const card = likeButton.closest('.places__item');
        likeCard(likeButton);
    }
});

// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}



// @todo: Вывести карточки на страницу
function renderCards(cardsArray) {
    placesList.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек
    cardsArray.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard, likeCard);
        placesList.appendChild(cardElement);
    });
}


renderCards(initialCards); 

document.addEventListener('DOMContentLoaded', function() {
    const editProfileButton = document.querySelector('.profile__edit-button');
    const editProfilePopup = document.querySelector('.popup_type_edit'); 

    const addPlaceButton = document.querySelector('.profile__add-button');
    const addPlacePopup = document.querySelector('.popup_type_new-card'); 

    const imagePopup = document.querySelector('.popup_type_image');

    function openPopup(popup) {
        popup.classList.add('popup_is-opened', 'popup_is-animated');
        // Добавляем обработчик события нажатия на клавишу Esc
        document.addEventListener('keydown', closePopupByEsc);
        fillFormFields();
    }

    function closePopup(popup) {
        popup.classList.remove('popup_is-opened', 'popup_is-animated');
        // Удаляем обработчик события нажатия на клавишу Esc
        document.removeEventListener('keydown', closePopupByEsc);
    }

    // Функция закрытия попапа по клику на оверлей
    function closePopupByOverlay(event) {
        if (event.target === this) {
            const popup = event.currentTarget;
            closePopup(popup);
        }
    }

    // Функция закрытия попапа по нажатию на клавишу Esc
    function closePopupByEsc(event) {
        if (event.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_is-opened');
            if (openedPopup) {
                closePopup(openedPopup);
            }
        }
    }

       // Функция заполнения полей формы текущими значениями
       function fillFormFields() {
        const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
        const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
        const profileName = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');

        nameInput.value = profileName.textContent;
        descriptionInput.value = profileDescription.textContent;
    }

    editProfileButton.addEventListener('click', function() {
        openPopup(editProfilePopup);
    });

    addPlaceButton.addEventListener('click', function() {
        openPopup(addPlacePopup);
    });

    // Добавляем обработчики для закрытия попапов при клике на оверлей и крестик
    const closeButtons = document.querySelectorAll('.popup__close');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const popup = button.closest('.popup');
            if (popup) {
                closePopup(popup);
            }
        });
    });

    // Добавляем обработчик для закрытия попапов по клику на оверлей
    const popups = document.querySelectorAll('.popup');
    popups.forEach(function(popup) {
        popup.addEventListener('click', closePopupByOverlay);
    });

    // Добавляем обработчик для открытия попапа с изображением
    const imagePopupButton = document.querySelector('.popup_type_image');
    const imagePopupContent = imagePopupButton.querySelector('.popup__content_content_image');
    const image = imagePopupContent.querySelector('.popup__image');
    const caption = imagePopupContent.querySelector('.popup__caption');

    // Функция открытия попапа с изображением и установки подписи
    function openImagePopup(imageUrl, captionText) {
        const imagePopup = document.querySelector('.popup_type_image');
        const image = imagePopup.querySelector('.popup__image');
        const caption = imagePopup.querySelector('.popup__caption');

        image.src = imageUrl;
        image.alt = captionText;
        caption.textContent = captionText;

        openPopup(imagePopup);
    }

    // Слушаем клик на изображениях
    const images = document.querySelectorAll('.card__image');
    images.forEach(function(img) {
        img.addEventListener('click', function() {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt');
            const caption = img.nextElementSibling.textContent;
            openImagePopup(src, alt, caption);
        });
    });

//изменение данных

 // Находим форму в DOM
 const formElement = editProfilePopup.querySelector('.popup__form[name="edit-profile"]');
 // Находим поля формы в DOM
 const nameInput = formElement.querySelector('.popup__input_type_name');
 const jobInput = formElement.querySelector('.popup__input_type_description');

 // Обработчик отправки формы
 function handleFormSubmit(evt) {
     evt.preventDefault(); // Отменяем стандартное поведение формы (отправку на сервер)

     // Получаем значение полей nameInput и jobInput
     const newName = nameInput.value;
     const newJob = jobInput.value;

     // Выбираем элементы, куда нужно вставить новые значения
     const profileName = document.querySelector('.profile__title');
     const profileDescription = document.querySelector('.profile__description');

     // Вставляем новые значения в текстовые узлы элементов
     profileName.textContent = newName;
     profileDescription.textContent = newJob;

     // Закрываем попап после сохранения
     closePopup(editProfilePopup);
 }

 // Прикрепляем обработчик отправки формы
 formElement.addEventListener('submit', handleFormSubmit);

// добавление новой карточки


 // Находим форму добавления новой карточки в DOM
 const addCardForm = document.querySelector('.popup_type_new-card .popup__form');

 // Обработчик отправки формы добавления новой карточки
 function handleAddCardFormSubmit(evt) {
     evt.preventDefault(); // Отменяем стандартное поведение формы (отправку на сервер)

     // Получаем значения полей формы
     const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
     const cardImageUrlInput = addCardForm.querySelector('.popup__input_type_url');
     const cardName = cardNameInput.value;
     const cardImageUrl = cardImageUrlInput.value;

     // Создаем новый элемент карточки
     const newCardElement = createCardElement(cardName, cardImageUrl);

     // Находим контейнер для карточек
     const placesList = document.querySelector('.places__list');

     // Добавляем новую карточку в начало контейнера
     placesList.prepend(newCardElement);

     // Очищаем поля формы
     addCardForm.reset();

     // Закрываем попап после добавления карточки
     const addCardPopup = document.querySelector('.popup_type_new-card');
     closePopup(addCardPopup);
 }



 
 // Прикрепляем обработчик отправки формы добавления новой карточки
 addCardForm.addEventListener('submit', handleAddCardFormSubmit);

//----------

 // Функция для создания элемента карточки
function createCardElement(cardName, cardImageUrl) {
    // Создаем элементы карточки
    const cardElement = document.createElement('li');
    cardElement.classList.add('places__item', 'card');

    const cardImage = document.createElement('img');
    cardImage.classList.add('card__image');
    cardImage.src = cardImageUrl;
    cardImage.alt = cardName;

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card__description');

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = cardName;

    const cardLikeButton = document.createElement('button');
    cardLikeButton.classList.add('card__like-button');

    // Перенесли кнопку удаления карточки перед описанием карточки
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('card__delete-button');

    // Добавляем элементы карточки в карточку
    cardDescription.appendChild(cardTitle);
    cardDescription.appendChild(cardLikeButton);
    cardElement.appendChild(cardImage);
    cardElement.appendChild(deleteButton); // Добавляем кнопку удаления
    cardElement.appendChild(cardDescription);

    // Добавляем обработчик события для открытия попапа с изображением
    cardImage.addEventListener('click', function() {
        openImagePopup(cardImageUrl, cardName);
    });

    // Добавляем обработчик события для удаления карточки
    deleteButton.addEventListener('click', function() {
        deleteCard(cardElement);
    });

    

    return cardElement;
}


});



/* import {openModal, closeModal} from './components/modal.js'; 
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('#edit-profile-close');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__subtitle');
const popupFormProfile = document.querySelector('#form-profile');
const openAddCardButton = document.querySelector('.profile__add-button');
const inputAddCardName = document.querySelector('.form__input_type_place');
const inputAddCardLink = document.querySelector('.form__input_type_link');
const closePopupAddButton = document.querySelector('.popup__button-close');
const cardsContainer = document.querySelector('.elements');
const popupFormCard = document.querySelector('#form-card');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.form');
const inputList = formAddCard.querySelectorAll('.form__input');
const addCardButtonSave = popupAddCard.querySelector('.form__button');

const esc = 'Escape';

// Функция закрытия по оверлею 
const setOverlayListener = function(evt) {
   const openedPopup = document.querySelector('.popup_opened');
       if(evt.target === openedPopup) {
           closePopup(openedPopup);
       }
   }

// Функция закрытия по кнопке Escape
const setEscListener = function(evt) {
           if(evt.key === esc) {
           const openedPopup = document.querySelector('.popup_opened');
           closePopup(openedPopup);
       }
}

// Добавления карточек при загрузке страницы
 initialCards.forEach (function (item){
   renderCard(item.link, item.name);
})

function renderCard(link, name) {
   const cardTemplate = new Card('#template-card', name, link);

   cardsContainer.prepend(cardTemplate.createCard());
}

// Добавления карточек через инпут попапа
function handleCardFormSubmit(evt) {
   evt.preventDefault();
   renderCard(inputAddCardLink.value, inputAddCardName.value);
   const resetForm = new FormValidator (config, formAddCard);
   resetForm.resetForm();
   closePopup(popupAddCard);
   addCardButtonSave.disabled = true;
}

const enableValidation = (config, popup) => {
   const formValidatorEditProfile = new FormValidator(config, popup);
   formValidatorEditProfile.enableValidation();
}

// Открытие окна редактирования профиля
function openEditPopup() {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;

  enableValidation(config, popupEditProfile);
}

// Изменение данных профиля 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function closeAddCardPopup() {
   closePopup(popupAddCard);
   const resetForm = new FormValidator (config, formAddCard);
    resetForm.resetForm();
}

function openPopup(popup) {
   popup.classList.add('popup_opened');
   document.addEventListener('mousedown', setOverlayListener);
   document.addEventListener('keydown', setEscListener);
}

function closePopup(popup) {
   popup.classList.remove('popup_opened');
   document.removeEventListener('mousedown', setOverlayListener);
   document.removeEventListener('keydown', setEscListener);
}

// Cлушатель отправки формы редактирования профиля
popupFormProfile.addEventListener('submit', handleProfileFormSubmit); 

// Cлушатель кнопки открытия попапа редактирования профиля
openPopupButton.addEventListener('click', openEditPopup);

// Кнопка закрытия попапа редактирования профиля
closePopupButton.addEventListener('click', () => {
   closePopup(popupEditProfile);
});

// Слушатель кнопки открытия попапа для добавления карточки
openAddCardButton.addEventListener('click', () => {
   openPopup(popupAddCard);
    inputList.forEach((input) => {
        input.addEventListener('keydown', () => {
            enableValidation(config, popupAddCard);
        })
    })
});

// Слушатель кнопки закрытия попапа добавления карточки
closePopupAddButton.addEventListener('click', closeAddCardPopup);

// Cлушатель отправки формы добавления карточки из попапа
popupFormCard.addEventListener('submit', handleCardFormSubmit);

const config = {
   formSelector: '.form',
   inputSelector: '.form__input',
   submitButtonSelector: '.form__button',
   inputErrorClass: 'form__input_type_error',
   errorClass: 'form__input-error_is-active'    
}

export {openPopup, closePopup};

const formElement = document.querySelector('.popup__form');


function handleFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем значения полей nameInput и jobInput
    const newName = nameInput.value;
    const newJob = jobInput.value;

    // Выбираем элементы, куда нужно вставить новые значения
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Вставляем новые значения
    profileName.textContent = newName;
    profileDescription.textContent = newJob;

    // Закрываем модальное окно
    closeModal(document.querySelector('.popup_opened'));
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);

*/
