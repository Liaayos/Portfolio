export default class Player {
    constructor(name, isStartingPlayer) {
        this.id = Date.now()
        this.name = name
        this.isStartingPlayer = isStartingPlayer
        this.playedTime = 0
        this.startingTime = null
        this.total = 0
    }

    setMoneyToPay(matchTime, unitaryCost) {
        this.setTimeOut(matchTime)
        this.total = (unitaryCost * (this.playedTime / matchTime))
        return this.total;
    }

    setTimeIn(time) {
        this.startingTime = time
    }

    setTimeOut(time) {
        console.log({ptime: this.playedTime + (time - (this.startingTime || time))}, {calc: (this.startingTime || time)}, {time})
        this.playedTime = this.playedTime + (time - (this.startingTime || time))
        this.startingTime = null
    }

}