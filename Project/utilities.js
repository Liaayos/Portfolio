export function qs(selector) { 
    const selectedElement = document.querySelector(selector);
    return selectedElement
}

export function onTouch(elementSelector, callback) {
    elementSelector.addEventListener('click', callback);
    elementSelector.addEventListener('touchend', callback);
 }