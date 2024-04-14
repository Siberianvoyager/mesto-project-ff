import './pages/index.css';
import initialCards from './scripts/cards.js';
import {createCard, likeCard, openImagePopup} from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';


const placesList = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addPlacePopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');


function renderCards(cardsArray) {
   placesList.innerHTML = '';
   cardsArray.forEach(cardData => {
       const cardElement = createCard(cardData);
       placesList.appendChild(cardElement);
   });
}

renderCards(initialCards);


document.querySelectorAll('.popup__close').forEach(closeButton => {
   closeButton.addEventListener('click', () => {
       closePopup(closeButton.closest('.popup'));
   });
});

document.querySelectorAll('.popup').forEach(popup => {
   popup.addEventListener('click', event => {
       if (event.target === popup) {
           closePopup(popup);
       }
   });
});

document.querySelector('.profile__edit-button').addEventListener('click', () => {
   const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
   const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
   const profileName = document.querySelector('.profile__title');
   const profileDescription = document.querySelector('.profile__description');
   nameInput.value = profileName.textContent;
   descriptionInput.value = profileDescription.textContent;
   openPopup(editProfilePopup);
});

document.querySelector('.profile__add-button').addEventListener('click', () => openPopup(addPlacePopup));


const editProfileForm = editProfilePopup.querySelector('.popup__form[name="edit-profile"]');
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

function handleEditProfileFormSubmit(evt) {
   evt.preventDefault();
   const nameInput = editProfileForm.querySelector('.popup__input_type_name');
   const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
   const profileName = document.querySelector('.profile__title');
   const profileDescription = document.querySelector('.profile__description');
   profileName.textContent = nameInput.value;
   profileDescription.textContent = descriptionInput.value;
   closePopup(editProfilePopup);
}


const addCardForm = addPlacePopup.querySelector('.popup__form');
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

function handleAddCardFormSubmit(evt) {
   evt.preventDefault();
   const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
   const cardImageUrlInput = addCardForm.querySelector('.popup__input_type_url');
   const cardName = cardNameInput.value;
   const cardImageUrl = cardImageUrlInput.value;
   const newCard = { name: cardName, link: cardImageUrl };
   const newCardElement = createCard(newCard);
   placesList.prepend(newCardElement);
   addCardForm.reset();
   closePopup(addPlacePopup);
}