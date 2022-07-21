import Game from './game.js';
import Team from './team.js'
import {
    qs,
    onTouch
} from './utilities.js'
import * as ls from './ls.js';


const btnSelector = qs('.btn')

const newGame = new Game();

reloadDropDown ()

onTouch(btnSelector, () => {

    const playersNumber = document.getElementById("playersNumber").value;
    const totalCost = document.getElementById("totalCost").value;

    newGame.playersNumber = playersNumber
    newGame.totalCost = totalCost
    newGame.startingTime = Date.now()

    newGame.saveInfo(Date.now(), playersNumber, totalCost)
    reloadDropDown ()

})



const team = new Team()
team.listPlayers()
onTouch((qs('.addPlayerBtn')), () => {
    if (team.getInitialTeamNumber() < newGame.playersNumber){
        team.addPlayer(true)
    } else {
        team.addPlayer(false)
    }

})

onTouch((qs('.go')), () => {
    team.substitute(qs('#playing').value,qs('#notPlaying').value)
    reloadDropDown()
    team.listPlayers()
})


function showTime() {
    const miliseconds = (Date.now() - newGame.startingTime)
    qs('#time').textContent = (parseInt(miliseconds / 60000)).toString() + ':' + ((parseInt(miliseconds / 1000)) % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}

setInterval(showTime, 1000)



function reloadDropDown () {
    let selectPlaying = document.getElementById("playing");
    selectPlaying.textContent = ""
    let optionsPlaying = ls.readFromLS("players").filter(item => item.isStartingPlayer === true);
    
    for(let i = 0; i < optionsPlaying.length; i++) {
        let opt = optionsPlaying[i].name;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = optionsPlaying[i].id;
        selectPlaying.appendChild(el);
    }
    
    let selectNotPlaying = document.getElementById("notPlaying");
    selectNotPlaying.textContent = ""
    let optionsNotPlaying = ls.readFromLS("players").filter(item => item.isStartingPlayer === false);
    
    for(let i = 0; i < optionsNotPlaying.length; i++) {
        let opt = optionsNotPlaying[i].name;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = optionsNotPlaying[i].id;
        selectNotPlaying.appendChild(el);
    }
}