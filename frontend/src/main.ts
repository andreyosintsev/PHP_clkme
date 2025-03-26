document.addEventListener("DOMContentLoaded", () => {
    const elementForm = document.querySelector('.form');
    if (!elementForm) return console.error('DOM: no form element found');

    const elementInput = document.querySelector('.form__input');
    if (!elementInput) return console.error('DOM: no input element found');

    elementForm.addEventListener('submit', submitFormHandler);
    elementInput.addEventListener('input', checkInput);
})

function submitFormHandler(e: Event): void {
    e.preventDefault();

    const elementResult = document.querySelector('.result');

    if (!elementResult) return console.error('DOM: no result element found');

    showElement(elementResult as HTMLElement);
}

function showElement(element: HTMLElement): void {
    if (!element) return console.error('DOM: no element found');

    element.classList.remove('opacity-0');
    element.classList.add('opacity-100');
}

function hideElement(element: HTMLElement): void {    
    if (!element) return console.error('DOM: no element found');

    element.classList.remove('opacity-100');
    element.classList.add('opacity-0');
}

function resetForm(elementForm: HTMLFormElement): void {
    if (!elementForm) return console.error('DOM: no form element found');

    elementForm.reset();
}

function checkInput(e: Event): void {
    console.log('Input!');
    
    const inputElement = e.target;
    if (!inputElement) return console.error('DOM: no input element found');
    if (!(inputElement instanceof HTMLInputElement)) return console.error('DOM: input element is not HTMLInputElement');


    // const isValid = /^[^\s.]+\.[^\s.]{2,}$/.test(inputElement.value);
    const isValid = /^[^\s.]+\.(?![0-9]+$)[a-zA-Zа-яА-ЯёЁ0-9]{2,}$/.test(inputElement.value);
    
    // inputElement.classList.toggle('focus:border-none', !isValid && inputElement.value.length > 0);    
    inputElement.classList.toggle('focus:border-red-500', !isValid && inputElement.value.length > 0);    
    inputElement.classList.toggle('border-red-500', !isValid && inputElement.value.length > 0);
}