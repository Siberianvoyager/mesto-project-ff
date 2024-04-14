/* // Импорт необходимых данных или модулей
import { initialCards, deleteCard, placesList } from '..index'; // Импортируем функцию удаления карточки из index.js

// Функция создания карточки
export function createCard(data, deleteCallback) { 
    // Клонируем содержимое темплейта карточки
    const card = cardTemplate.content.cloneNode(true).querySelector('.places__item');

    // Получаем ссылку на изображение карточки и ее заголовок
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    // Заполняем атрибуты карточки данными из объекта data
    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    // Находим кнопку удаления карточки и добавляем обработчик события на клик
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteCallback(card); // Вызываем колбэк функцию для удаления карточки
    });

    return card; // Возвращаем созданную карточку
}

// Функция удаления карточки, передаваемая как аргумент в функцию createCard
export function deleteCardForm(card) {
    card.remove(); // Удаляем карточку из DOM
}
*/

/*
import { openPopup, closePopup } from './index.js';

const popupFigure = document.querySelector('.popup_type_image');
const popupFigureImage = popupFigure.querySelector('.figure__image');
const popupFigureCaption = popupFigure.querySelector('.figure__caption');
const closeImgButton = document.querySelector('#closeImg');

class Card {
    constructor(cardSelector, name, link) {
        this._cardSelector = cardSelector;
        this._name = name;
        this._link = link
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content.querySelector('.element').cloneNode(true)

        return cardElement
    }

    _openPopup() {
        openPopup(popupFigure)
        popupFigureImage.src = this._link;
        popupFigureCaption.textContent = this._name;
        popupFigureImage.alt = this._name;
        closeImgButton.addEventListener('click', () => {
            closePopup(popupFigure);
        })
    }

    _deleteCard() {
        this._element.remove();
    }

    _handlelikeButton(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopup();
        })
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        })
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._handlelikeButton(evt);
        })
    }

    createCard() {
        this._element = this._getTemplate();

        const image = this._element.querySelector('.element__image');
        const title = this._element.querySelector('.element__text');

        image.src = this._link;
        image.alt = this._name;
        title.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}

export {Card}
*/