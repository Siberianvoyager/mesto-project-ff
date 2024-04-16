export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }

  export function deleteCard(cardElement) {
    cardElement.remove();
}

export function createCard(data, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('card__delete-button');
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
  
    cardImage.addEventListener('click', () => openImagePopup(data.link, data.name));
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));
    deleteButton.addEventListener('click', () => deleteCard(cardElement.closest('.places__item')));
   
    return cardElement;
  }


  
 