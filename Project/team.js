import * as ls from './ls.js';
import * as util from './utilities.js';
import Player from "./player.js"

export default class Team {
    constructor() {
        this.key = "players"
        this.element = "playerList"
        this.players = ls.readFromLS(this.key) || []
    }

    addPlayer(isStarting) {
        const playerName = document.getElementById('playerName').value;
        const newPlayer = new Player(this.players.length, playerName, isStarting)


        const newPlayersList = ls.readFromLS(this.key) || []
        newPlayersList.push(newPlayer)
        ls.writeToLS("players", newPlayersList)
        this.listPlayers()
    }

    listPlayers() {
        const playerList = ls.readFromLS(this.key)
        renderPlayersList(playerList, this.key, this.element)
    }

    getInitialTeamNumber() {
        const localStorageArray = ls.readFromLS(this.key);

        let number = 0

        if (localStorageArray !== null) {
            number = (localStorageArray.filter(item => item.isStartingPlayer === true)).length;
        }

        return number
    }

    substitute(idOut, idIn){
        switchStatus(idOut, this.key)
        console.log({in:idIn})
        switchStatus(idIn, this.key)

    }

}

function renderPlayersList(list, key, element) {
    let ul = document.getElementById(element);
    ul.textContent = ""
    if (list !== null) {

        list.forEach(function (item) {

            const text = item.name;

            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', "checkbox");
            checkbox.setAttribute('id', item.id);
            checkbox.setAttribute('name', item.id);

            const btnItem = document.createElement('button');
            btnItem.setAttribute('type', "button");
            btnItem.setAttribute('id', item.id + "btn");
            btnItem.textContent = "Delete"

            console.log(item.isStartingPlayer)
            checkbox.checked = item.isStartingPlayer

            util.onTouch(btnItem, () => {
                deletePlayer(list, item.id, key, element)
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

    return
}

function switchStatus(id, key) {
    const playerList = ls.readFromLS(key)
    const numberActual = (playerList.filter(item => item.isStartingPlayer === true)).length;
    const maxNumber = ls.readFromLS("game").playersNumber
        playerList.forEach(function (item) {
            if (item.id === parseInt(id) && (numberActual < maxNumber || item.isStartingPlayer)) {
                item.isStartingPlayer = !item.isStartingPlayer;
                ls.writeToLS(key, playerList);
            }else {
                renderPlayersList(playerList, key, "playerList")
            }
        })
    
}



function deletePlayer(list, id, key, element) {
    const playerList = ls.readFromLS(key)
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].id === id) {
            playerList.splice(i, 1);
            break;
        }
    }
    list = playerList;
    ls.writeToLS(key, playerList);
    renderPlayersList(ls.readFromLS(key), key, element);
}