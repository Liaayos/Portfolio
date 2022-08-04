import Game from './game.js';
import Team from './team.js'
import {
    qs, switchDisplay,
    onTouch
} from './utilities.js'
import * as ls from './ls.js';


const btnSelector = qs('.btn')

const stageManager = {
    'planningStage': () => {
        newGame.setStage("planningStage")
        qs('.planning').style.display = "block"
        qs('.players').style.display = "none"
        qs('.stage-time').style.display = "none"
        qs('.substitution').style.display = "none"
        switchDisplay('.delete-plyr-btn','inline-block') 

    },
    'addPlayersStage': () => {
        newGame.setStage("addPlayersStage")
        qs('.planning').style.display = "none"
        qs('.players').style.display = "block"
        qs('.btn').style.display = "inline-block"
    },
    'gameStartedStage': () => {
        stageManager['addPlayersStage']()
        newGame.setStage("gameStartedStage")
        qs('.stage-time').style.display = "block"
        qs('.substitution').style.display = "block"
        qs('.btn').style.display = "none"
        switchDisplay('.delete-plyr-btn','none')   
    }
}

const newGame = new Game();

reloadDropDown()
const team = new Team()
team.listPlayers()
stageManager[newGame.stage]()


onTouch(btnSelector, () => {

    const playersNumber = document.getElementById("playersNumber").value;
    const totalCost = document.getElementById("totalCost").value;
    newGame.playersNumber = playersNumber
    newGame.totalCost = totalCost
    newGame.startingTime = Date.now()
    newGame.isGameStarted = true

    newGame.saveInfo(Date.now(), playersNumber, totalCost, true)
    reloadDropDown()
    team.setTimeForInitialTeam()

    stageManager['gameStartedStage']()

    


})
onTouch((qs('#set-plan-btn')), () => {
    stageManager['addPlayersStage']()
})
onTouch((qs('.reset-btn')), () => {
    stageManager['planningStage']()
})
onTouch((qs('.addPlayerBtn')), () => {
    if (team.getInitialTeamNumber() < newGame.playersNumber) {
        team.addPlayer(true, newGame.stage)
    } else {
        team.addPlayer(false, newGame.stage)
    }
    reloadDropDown()
})

onTouch((qs('.go')), () => {
    const miliseconds = (Date.now() - newGame.startingTime)
    team.substitute(qs('#playing').value, qs('#notPlaying').value, miliseconds)
    reloadDropDown()
    team.listPlayers()
})

onTouch((qs('.finish')), () => {
    team.setPayments(Date.now() - newGame.startingTime, newGame.totalCost / newGame.playersNumber)
})


function showTime() {
    const miliseconds = (Date.now() - newGame.startingTime)
    qs('#time').textContent = (parseInt(miliseconds / 60000)).toString() + ':' + ((parseInt(miliseconds / 1000)) % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}

setInterval(showTime, 1000)

function reloadDropDown() {
    const players = ls.readFromLS("players")

    if (players) {

        let selectPlaying = document.getElementById("playing");
        selectPlaying.textContent = ""
        let optionsPlaying = players.filter(item => item.isStartingPlayer === true);

        for (let i = 0; i < optionsPlaying.length; i++) {
            let opt = optionsPlaying[i].name;
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = optionsPlaying[i].id;
            selectPlaying.appendChild(el);
        }

        let selectNotPlaying = document.getElementById("notPlaying");
        selectNotPlaying.textContent = ""
        let optionsNotPlaying = players.filter(item => item.isStartingPlayer === false);

        for (let i = 0; i < optionsNotPlaying.length; i++) {
            let opt = optionsNotPlaying[i].name;
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = optionsNotPlaying[i].id;
            selectNotPlaying.appendChild(el);
        }
    }
}