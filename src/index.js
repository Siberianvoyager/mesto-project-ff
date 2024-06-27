import './pages/index.css';
import { createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addNewCard, updateAvatar } from './components/api.js';

document.addEventListener('DOMContentLoaded', function () {
    const placesList = document.querySelector('.places__list');
    const editProfilePopup = document.querySelector('.popup_type_edit');
    const addPlacePopup = document.querySelector('.popup_type_new-card');
    const imagePopup = document.querySelector('.popup_type_image');
    const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
    const image = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__caption');
    const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
    const descriptionInput = editProfilePopup.querySelector('.popup__input_type_description');
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    const profileAvatar = document.querySelector('.profile__avatar');
    const profileAvatarEditIcon = document.querySelector('.profile__avatar-edit-icon');
    const editProfileForm = editProfilePopup.querySelector('.popup__form[name="edit-profile"]');
    const addCardForm = addPlacePopup.querySelector('.popup__form');
    const updateAvatarForm = updateAvatarPopup.querySelector('.popup__form');
    const avatarInput = updateAvatarForm.querySelector('.popup__input_type_url');
    const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
    const cardImageUrlInput = addCardForm.querySelector('.popup__input_type_url');

    let userId;

    function renderCards(cardsArray) {
        placesList.innerHTML = '';
        cardsArray.forEach(cardData => {
            const cardElement = createCard(cardData, userId, openImagePopup);
            placesList.appendChild(cardElement);
        });
    }

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
        clearValidation(editProfileForm, validationConfig);
        openPopup(editProfilePopup);
    });

    document.querySelector('.profile__add-button').addEventListener('click', () => {
        addCardForm.reset();
        clearValidation(addCardForm, validationConfig);
        openPopup(addPlacePopup);
    });

    profileAvatarEditIcon.addEventListener('click', () => {
        updateAvatarForm.reset();
        clearValidation(updateAvatarForm, validationConfig);
        openPopup(updateAvatarPopup);
    });

    editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

    function handleEditProfileFormSubmit(evt) {
        evt.preventDefault();
        const submitButton = editProfileForm.querySelector('.popup__button');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Сохранение...';
        updateUserInfo(nameInput.value, descriptionInput.value)
            .then(userData => {
                profileName.textContent = userData.name;
                profileDescription.textContent = userData.about;
                closePopup(editProfilePopup);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                submitButton.textContent = originalButtonText;
            });
    }

    addCardForm.addEventListener('submit', handleAddCardFormSubmit);

    function handleAddCardFormSubmit(evt) {
        evt.preventDefault();
        const submitButton = addCardForm.querySelector('.popup__button');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Сохранение...';
        addNewCard(cardNameInput.value, cardImageUrlInput.value)
            .then(cardData => {
                const newCardElement = createCard(cardData, userId, openImagePopup);
                placesList.prepend(newCardElement);
                addCardForm.reset();
                clearValidation(addCardForm, validationConfig);
                closePopup(addPlacePopup);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                submitButton.textContent = originalButtonText;
            });
    }

    updateAvatarForm.addEventListener('submit', handleUpdateAvatarFormSubmit);

    function handleUpdateAvatarFormSubmit(evt) {
        evt.preventDefault();
        const submitButton = updateAvatarForm.querySelector('.popup__button');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Сохранение...';
        updateAvatar(avatarInput.value)
            .then(userData => {
                profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
                closePopup(updateAvatarPopup);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                submitButton.textContent = originalButtonText;
            });
    }

    const validationConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    };

    enableValidation(validationConfig);

    Promise.all([getUserInfo(), getInitialCards()])
        .then(([userData, cardsArray]) => {
            userId = userData._id;
            profileName.textContent = userData.name;
            profileDescription.textContent = userData.about;
            profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
            renderCards(cardsArray);
        })
        .catch(err => {
            console.log(err);
        });
});





























