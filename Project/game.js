import { writeToLS, readFromLS } from "./ls.js"
import { qs } from "./utilities.js"

export default class Game {
    constructor(){

        this.startingTime = readFromLS("game")?.startingTime || Date.now()
        this.playersNumber = readFromLS("game")?.playersNumber || 7
        this.endingTime 
        this.totalCost = readFromLS("game")?.totalCost || 100000
        this.saveInfo(this.startingTime, this.playersNumber, this.totalCost)
        this.loadInfo()

        
    }

    

    saveInfo(startingTime, playersNumber, totalCost){
        const info = {
            startingTime,
            playersNumber,
            totalCost
        }
        writeToLS("game", info)
    
    }
    
    loadInfo () {
        qs('#playersNumber').value = this.playersNumber
        qs('#totalCost').value = this.totalCost
    }

}

