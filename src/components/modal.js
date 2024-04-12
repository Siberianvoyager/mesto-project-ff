/*export function openModal(modalElement) {
    modalElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
}

export function closeModal(modalElement) {
    modalElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
}

export function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_opened');
        closeModal(openedModal);
    }
}
*/
// Функция для открытия модального окна
function openModal(modalElement) {
    modalElement.classList.add('popup_opened');
}

// Функция для закрытия модального окна
function closeModal(modalElement) {
    modalElement.classList.remove('popup_opened');
}

// Получаем ссылки на модальные окна
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Получаем кнопки для открытия модальных окон
const openEditProfileButton = document.querySelector('.profile__edit-button');
const openAddCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// Добавляем обработчики событий для кнопок открытия и закрытия модальных окон
openEditProfileButton.addEventListener('click', () => openModal(editProfilePopup));
openAddCardButton.addEventListener('click', () => openModal(addCardPopup));
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(editProfilePopup);
        closeModal(addCardPopup);
        closeModal(imagePopup);
    });
});

// Добавляем обработчик события для закрытия модальных окон по клику вне области модального окна
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
        closeModal(editProfilePopup);
        closeModal(addCardPopup);
        closeModal(imagePopup);
    }
});
