import './pages/index.css';
import initialCards from './scripts/cards.js'; 
import {openModal, closeModal} from './components/modal.js'; 
// @todo: Темплейт карточки  
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(data, deleteCallback) { 
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

    return card;
}


// @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}

// @todo: Вывести карточки на страницу
function renderCards(cardsArray) {
    cardsArray.forEach(cardData => {
        const cardElement = createCard(cardData, deleteCard);
        placesList.appendChild(cardElement);
    });
}

renderCards(initialCards); 

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


