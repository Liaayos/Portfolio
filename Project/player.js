export default class Player {
    constructor(id, name, isStartingPlayer) {
        this.id = Date.now()
        this.name = name
        this.isStartingPlayer = isStartingPlayer 
        this.playTime = 0
        this.times = []
    }

    getPayment(totalCost) {
        return 0;
    }

}