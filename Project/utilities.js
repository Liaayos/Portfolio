export function qs(selector) { 
    const selectedElement = document.querySelector(selector);
    return selectedElement
}

export function qsAll(selector) { 
    const selectedElements = document.querySelectorAll(selector);
    return selectedElements
}

export function switchDisplay(selector, status) {
    const elements = qsAll(selector)
    if (elements) {
        elements.forEach(element => {
            element.style.display = status
        })
    }
}

export function onTouch(elementSelector, callback) {
    elementSelector.addEventListener('click', callback);
    //elementSelector.addEventListener('touchend', callback);
 }