
import { openPopup, closePopup } from './modal.js';
import { imagePopup } from '../index.js';


export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
 }

 
export function createCard(data) {
    const cardElement = document.createElement('li');
    cardElement.classList.add('places__item', 'card');
 
    const cardImage = document.createElement('img');
    cardImage.classList.add('card__image');
    cardImage.src = data.link;
    cardImage.alt = data.name;
 
    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card__description');
 
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = data.name;
 
    const cardLikeButton = document.createElement('button');
    cardLikeButton.classList.add('card__like-button');
 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('card__delete-button');
 
     
    deleteButton.addEventListener('click', () => {
     const card = deleteButton.closest('.places__item');
     card.remove(); 
 });
 
    cardDescription.appendChild(cardTitle);
    cardDescription.appendChild(cardLikeButton);
    cardElement.appendChild(cardImage);
    cardElement.appendChild(deleteButton);
    cardElement.appendChild(cardDescription);
 
    cardImage.addEventListener('click', () => openImagePopup(data.link, data.name));
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
 
    return cardElement;
 }

  
  export function openImagePopup(imageUrl, captionText) {
    const image = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__caption');
 
    image.src = imageUrl;
    image.alt = captionText;
    caption.textContent = captionText;
 
    openPopup(imagePopup);
 }