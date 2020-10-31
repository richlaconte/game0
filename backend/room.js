const Board = require('./board')

module.exports = class Room {
    constructor(name) {
        this.board = new Board
        this.players = []
        this.spectators = []
        this.chat = []
        this.details = {
            name,
            turn: 0,
        }
        this.checkTurn = (user) => {
            if (user.id === this.details.turn) {
                return true
            } else {
                return false
            }
        }
        this.toggleTurn = () => {
            if (this.details.turn === 0) {
                this.details.turn = 1
            } else {
                this.details.turn = 0
            }
        }

        this.addSpectator = (user) => {
            this.spectators.push(user)
        }
        this.removeSpectator = (user) => {
            this.spectators = this.spectators.filter(spectator => spectator.id !== user.id)
        }

        this.addPlayer = (user) => {
            if (this.players < 2) {
                this.players.push(user)
            } else {
                this.addSpectator(user)
            }
        }
        this.removePlayer = (user) => {
            this.players = this.players.filter(player => player.id !== user.id)
        }
    }

}