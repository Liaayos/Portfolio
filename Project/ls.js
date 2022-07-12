export function readFromLS(key) {
    const tasks = JSON.parse(localStorage.getItem(key));
    return tasks
 }

export function writeToLS(key, data) { 
    localStorage.setItem(key, JSON.stringify(data));
}