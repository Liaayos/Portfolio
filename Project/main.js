import Game from './game.js';
import {qs, onTouch} from './utilities.js'

const btnSelector = qs('.btn')
console.log(btnSelector)

onTouch(btnSelector, () =>{
    
    const playersNumber = document.getElementById("playersNumber").value

    const totalCost = document.getElementById("totalCost").value
})
