import { apiUrl, apiGetShortLink, copyToClipboard } from './scripts/index';
import { _t, setLanguage } from './scripts/language';

setLanguage('ru');

document.addEventListener("DOMContentLoaded", () => {
    let inputValue = '';

    const elementForm = document.querySelector('.form');
    if (!elementForm) return console.error('DOM: no form element found');

    const elementInput = document.querySelector('.form__input');
    if (!elementInput) return console.error('DOM: no input element found');

    const elementResult = document.querySelector('.result');
    if (!elementResult) return console.error('DOM: no result element found');

    elementForm.addEventListener('submit', (e) => submitFormHandler(e, elementInput as HTMLInputElement));
    elementInput.addEventListener('input', (e) => {
        if (e && e.target instanceof HTMLInputElement) {
            inputValue = e.target.value;
            hideElement(elementResult as HTMLElement);
            checkInput(e.target);
        } 
    });
    elementInput.addEventListener('focus', (e) => {
        if (e && e.target instanceof HTMLInputElement) {
            e.target.value = inputValue;
            removeErrorInput(e.target);
        }
    });
    elementResult.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputResult = elementResult.querySelector('.result__input');
        if (!(inputResult && inputResult instanceof HTMLInputElement)) {
            return console.error('DOM: no result input element found');
        }
        copyToClipboard(inputResult.value);
    });
})

function submitFormHandler(e: Event, elementInput: HTMLInputElement): void {
    e.preventDefault();

    const elementResult = document.querySelector('.result');

    if (!elementResult) return console.error('DOM: no result element found');

    if (checkInput(elementInput)) {

        try {
            apiGetShortLink(elementInput.value, apiUrl)
            .then((url) => {
                console.log('apiGetShortLink got result');
                showElement(elementResult as HTMLElement);
                setResult(elementResult as HTMLElement, url);
            })
            .catch ((error) => {
                setErrorInput(elementInput);
                elementInput.value = _t('errorNetwork');
                console.error(error);
            })
        }
        catch (error) {
                setErrorInput(elementInput);
                elementInput.value = _t('errorNetwork');
                console.error(error);
        }

    } else {
        setErrorInput(elementInput);
        elementInput.value = _t('invalidUrl');
    }
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

function checkInput(inputElement: HTMLElement): boolean {
    if (!inputElement) {
        console.error('DOM: no input element found');
        return false;
    }
    
    if (!(inputElement instanceof HTMLInputElement)) {
        console.error('DOM: input element is not HTMLInputElement');
        return false;
    }

    const isValid = /^(?!.*\s)(?!.*\.\d{2}(\/|$))([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s?#]*)?(\?[^\s#]*)?$/.test(inputElement.value);
    
    // inputElement.classList.toggle('focus:border-none', !isValid && inputElement.value.length > 0);    
    inputElement.classList.toggle('focus:border-red-500', !isValid/* && inputElement.value.length > 0*/);
    inputElement.classList.toggle('border-red-500', !isValid/* && inputElement.value.length > 0*/);

    return isValid;
}

function setErrorInput(inputElement: HTMLElement): void {
    console.log('setErrorInput');
    if (!inputElement) return console.error('DOM: no input element found');

    inputElement.classList.add('text-red-500');

    inputElement.classList.add('focus:border-red-500');
    inputElement.classList.add('border-red-500');
}

function removeErrorInput(inputElement: HTMLElement): void {
    if (!inputElement) return console.error('DOM: no input element found');

    inputElement.classList.remove('text-red-500');

    inputElement.classList.remove('focus:border-red-500');
    inputElement.classList.remove('border-red-500');
}

function setResult(element: HTMLElement, result: string = ''): void {
    if (!element) return console.error('DOM: no element found');

    const elementResult = document.querySelector('.result__input');
    if (!(elementResult && elementResult instanceof HTMLInputElement)) {
        return console.error('DOM: no result element found');
    }

    elementResult.value = result;
}

function isValidUrl(url: string) {
    console.log('url: ', url);
    try {
        new URL(url);
        console.log('valid URL');
        return true;
    } catch {
        console.log('invalid URL');
        return false;
    }
}