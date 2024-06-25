export function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, settings);
    });
}

function setEventListeners(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input, settings);
            toggleButtonState(inputs, button, settings);
        });
    });
    toggleButtonState(inputs, button, settings);
}

function validateInput(input, settings) {
    const errorElement = input.nextElementSibling;
    const validity = input.validity;

    if (validity.valueMissing) {
        showInputError(input, errorElement, "Вы пропустили это поле", settings);
    } else if (input.type === 'text' && (validity.tooShort || validity.tooLong)) {
        showInputError(input, errorElement, `Минимальное количество символов: ${input.minLength}. Длина текста сейчас: ${input.value.length} символ${input.value.length === 1 ? "" : "ов"}.`, settings);
    } else if (input.type === 'text' && !/^[A-Za-zА-Яа-яЁё\s\-]+$/.test(input.value)) {
        showInputError(input, errorElement, "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы", settings);
    } else if (input.type === 'url' && validity.typeMismatch) {
        showInputError(input, errorElement, "Введите адрес сайта", settings);
    } else {
        hideInputError(input, errorElement, settings);
    }
}

function showInputError(input, errorElement, errorMessage, settings) {
    input.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
    input.setAttribute('data-error-message', errorMessage);
}

function hideInputError(input, errorElement, settings) {
    input.classList.remove(settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
    input.removeAttribute('data-error-message');
}

function toggleButtonState(inputs, button, settings) {
    const hasInvalidInput = inputs.some(input => !input.validity.valid);
    button.disabled = hasInvalidInput;
    button.classList.toggle(settings.inactiveButtonClass, hasInvalidInput);
}

export function clearValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    inputs.forEach(input => {
        const errorElement = input.nextElementSibling;
        hideInputError(input, errorElement, settings);
    });
    const button = form.querySelector(settings.submitButtonSelector);
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
}

