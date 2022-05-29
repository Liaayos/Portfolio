import Todo from './todos.js';
import {qs, onTouch} from './utilities.js'

const todo = new Todo("taskList", "taskLS")

const btnSelector = qs('.btn')
console.log(btnSelector)

onTouch(btnSelector, () =>{todo.addTodo()})
onTouch((qs('.completed')), () => {todo.filterTodos(true)})
onTouch((qs('.active')), () => {todo.filterTodos(false)})
onTouch((qs('.all')), () => {todo.listTodos()})