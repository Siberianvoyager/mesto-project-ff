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

