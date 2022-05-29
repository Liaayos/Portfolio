import * as util from './utilities.js';
import * as ls from './ls.js';

export default class Todos {
    constructor(element, key) {
        this.element = element;
        this.key = key;
        todoList = getTodos(this.key)
        this.listTodos()
    }

    addTodo() {
        const text = document.getElementById('task').value;
        saveTodo(text, this.key);
        this.listTodos();
    }

    listTodos() {
        todoList = ls.readFromLS(this.key)
        renderTodoList(todoList, this.key, this.element)
    }

    removeTodo(id) {
        deleteTask(id, this.key, this.element);
    }

    filterTodos(completed) {
        
        todoList = ls.readFromLS(this.key).filter(item => item.completed === completed)
        renderTodoList(todoList, this.key, this.element)        
        return todoList
    }

    
}

let todoList = null;
/* build a todo object, add it to the todoList, and save the new list to local storage.
@param {string} key The key under which the value is stored under in LS @param {string} task The text of the task to be saved.
*/
function saveTodo(task, key) {
    const todo = {
        id: Date.now(),
        content: task,
        completed: false
    };

    if (todoList === null) {
        todoList = []
    }

    todoList.push(todo)

    ls.writeToLS(key, todoList)
}

/* check the contents of todoList, a local variable containing a list of ToDos. 
If it is null then pull the list of todos from localstorage, update the local variable, and return it
@param {string} key The key under which the value is stored under in LS @return {array} The value as an array of objects
*/
function getTodos(key) {
    if (todoList === null) {
        todoList = ls.readFromLS(key)
    }
    return todoList
}

/* foreach todo in list, build a li element for the todo, and append it to element
@param {array} list The list of tasks to render to HTML @param {element} element The DOM element to insert our list elements into.

*/
function renderTodoList(list, key, element) {
    let ul = document.getElementById(element);
    ul.textContent = ""
    if (list !== null) {

        list.forEach(function (item) {

            const text = item.content;

            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', "checkbox");
            checkbox.setAttribute('id', item.id);
            checkbox.setAttribute('name', item.id);

            const btnItem = document.createElement('button');
            btnItem.setAttribute('type', "button");
            btnItem.setAttribute('id', item.id + "btn");
            btnItem.textContent = "Delete"

            checkbox.checked = item.completed

            util.onTouch(btnItem, () => {
                deleteTask(item.id, key, element)
            })
            util.onTouch(checkbox, () => {
                switchStatus(item.id, key)
            })


            const labelItem = document.createElement('label');
            labelItem.setAttribute('for', item.id);


            labelItem.textContent = text;

            listItem.appendChild(checkbox);
            listItem.appendChild(labelItem);
            listItem.appendChild(btnItem);

            ul.appendChild(listItem);


        })
    }

    setActiveTasks(key)
}

function switchStatus(id, key) {
    todoList.forEach(function (item) {
        if (item.id === id) {
            item.completed = !item.completed;
            ls.writeToLS(key, todoList);
        }
    })
    setActiveTasks(key)
}

function deleteTask(id, key, element) {
    const renderList = todoList
    for (let i = 0; i < renderList.length; i++) {
        if (renderList[i].id === id) {
            renderList.splice(i, 1);
            break;
        }
    }
    todoList = ls.readFromLS(key)
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === id) {
            todoList.splice(i, 1);
            break;
        }
    }
    ls.writeToLS(key, todoList);
    renderTodoList(renderList, key, element);
}

function setActiveTasks(key){
    
    
    const localStorageArray = ls.readFromLS(key);
    
    let number = 0
    
    if (localStorageArray !== null) {
        number = (localStorageArray.filter(item => item.completed === false)).length;
    }

    util.qs(".tasksleft").textContent = number
}