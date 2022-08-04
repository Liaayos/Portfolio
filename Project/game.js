import { writeToLS, readFromLS } from "./ls.js"
import { qs } from "./utilities.js"

export default class Game {
    constructor(){

        this.startingTime = readFromLS("game")?.startingTime || Date.now()
        this.playersNumber = readFromLS("game")?.playersNumber || 7
        this.endingTime 
        this.totalCost = readFromLS("game")?.totalCost || 100000
        this.isGameStarted = readFromLS("game")?.isGameStarted || false
        this.stage = readFromLS("game")?.stage || 'planningStage'
        this.saveInfo(this.startingTime, this.playersNumber, this.totalCost, this.isGameStarted, this.stage)
        this.loadInfo()  
    }    

    saveInfo(startingTime, playersNumber, totalCost, isGameStarted, stage){
        const info = {
            startingTime,
            playersNumber,
            totalCost,
            isGameStarted,
            stage
        }
        writeToLS("game", info)    
    }
    
    loadInfo () {
        qs('#playersNumber').value = this.playersNumber
        qs('#totalCost').value = this.totalCost
    }

    setStage (stage) {
        const game = readFromLS("game")
        this.stage = stage
        game.stage = this.stage
        writeToLS("game", game)
    }

}

const stageManager = {
    'planningStage': () => {

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
        qs('.finish').style.display = "inline-block"
    }
}
