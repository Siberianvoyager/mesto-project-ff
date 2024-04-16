import './pages/index.css';
import initialCards from './scripts/cards.js';
import {createCard, likeCard, deleteCard} from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

document.addEventListener('DOMContentLoaded', function() {

    const placesList = document.querySelector('.places__list');
    const editProfilePopup = document.querySelector('.popup_type_edit');
    const addPlacePopup = document.querySelector('.popup_type_new-card');
    const imagePopup = document.querySelector('.popup_type_image');
    const image = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__caption');
    const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
    const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    const editProfileForm = editProfilePopup.querySelector('.popup__form[name="edit-profile"]');
    const addCardForm = addPlacePopup.querySelector('.popup__form');
    const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
    const cardImageUrlInput = addCardForm.querySelector('.popup__input_type_url');

    function renderCards(cardsArray) {
        placesList.innerHTML = '';
        cardsArray.forEach(cardData => {
            const cardElement = createCard(cardData, openImagePopup);
            cardElement.querySelector('.card__image').addEventListener('click', () => openImagePopup(cardData.link, cardData.name));
            placesList.appendChild(cardElement);
        });
    }

    renderCards(initialCards);

placesList.addEventListener('click', handleDeleteButtonClick);

    function openImagePopup(imageUrl, captionText) {
        image.src = imageUrl;
        image.alt = captionText;
        caption.textContent = captionText;
        openPopup(imagePopup);
    }

    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', event => {
            if (event.target === popup) {
                closePopup(popup);
            }
        });
    });

    document.querySelectorAll('.popup__close').forEach(closeButton => {
        closeButton.addEventListener('click', () => {
            closePopup(closeButton.closest('.popup'));
        });
    });

    document.querySelector('.profile__edit-button').addEventListener('click', () => {
        nameInput.value = profileName.textContent;
        descriptionInput.value = profileDescription.textContent;
        openPopup(editProfilePopup);
    });

    document.querySelector('.profile__add-button').addEventListener('click', () => openPopup(addPlacePopup));
 
    editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

    function handleEditProfileFormSubmit(evt) {
        evt.preventDefault();
        profileName.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
        closePopup(editProfilePopup);
    }
   
    addCardForm.addEventListener('submit', handleAddCardFormSubmit);

    function handleAddCardFormSubmit(evt) {
        evt.preventDefault();
        const cardName = cardNameInput.value;
        const cardImageUrl = cardImageUrlInput.value;
        const newCard = { name: cardName, link: cardImageUrl };
        const newCardElement = createCard(newCard,  openImagePopup);
        placesList.prepend(newCardElement);
        addCardForm.reset();
        closePopup(addPlacePopup);
    }

    function handleDeleteButtonClick(event) {
        const deleteButton = event.target.closest('.card__delete-button');
        if (deleteButton) {
            const card = deleteButton.closest('.places__item');
            card.remove();
        }
    }
});

