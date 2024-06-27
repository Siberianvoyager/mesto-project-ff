import { deleteCard, likeCard, unlikeCard } from './api.js';

export function createCard(cardData, userId, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCount = cardElement.querySelector('.card__like-count');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardLikeCount.textContent = cardData.likes.length;

    if (cardData.likes.some(like => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_active');
    }

    if (cardData.owner._id !== userId) {
        cardDeleteButton.style.display = 'none';
    } else {
        cardDeleteButton.addEventListener('click', () => {
            openConfirmDeletePopup(cardData._id, cardElement);
        });
    }

    cardLikeButton.addEventListener('click', () => handleLikeButtonClick(cardData._id, cardLikeButton, cardLikeCount));

    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

    return cardElement;
}

function openConfirmDeletePopup(cardId, cardElement) {
    const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
    const confirmDeleteForm = confirmDeletePopup.querySelector('.popup__form');

    function onSubmit(evt) {
        handleDeleteFormSubmit(evt, cardId, cardElement);
        confirmDeleteForm.removeEventListener('submit', onSubmit);
    }

    confirmDeleteForm.addEventListener('submit', onSubmit);

    openPopup(confirmDeletePopup);

    function onClose() {
        closePopup(confirmDeletePopup);
        confirmDeleteForm.removeEventListener('submit', onSubmit);
        confirmDeletePopup.removeEventListener('click', onClose);
        confirmDeletePopup.querySelector('.popup__close').removeEventListener('click', onClose);
    }

    confirmDeletePopup.addEventListener('click', (event) => {
        if (event.target === confirmDeletePopup) {
            onClose();
        }
    });

    confirmDeletePopup.querySelector('.popup__close').addEventListener('click', onClose);
}

function handleDeleteFormSubmit(evt, cardId, cardElement) {
    evt.preventDefault();
    handleDeleteCard(cardId, cardElement);
}

function handleDeleteCard(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
            const confirmDeletePopup = document.querySelector('.popup_type_confirm-delete');
            closePopup(confirmDeletePopup);
        })
        .catch(err => console.log(err));
}

function handleLikeButtonClick(cardId, likeButton, likeCount) {
    const isLiked = likeButton.classList.contains('card__like-button_active');
    const likeAction = isLiked ? unlikeCard : likeCard;

    likeAction(cardId)
        .then(cardData => {
            likeButton.classList.toggle('card__like-button_active');
            likeCount.textContent = cardData.likes.length;
        })
        .catch(err => console.log(err));
}