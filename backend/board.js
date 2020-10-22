module.exports = class Board {
    constructor() {
        this.board = [
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }],
            [{ isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }, { isEmpty: true }]
        ]
        this.spawnCard = (card) => {
            if (this.board[11][11].isEmpty) {
                this.board[11][11].occupant = card
                this.board[11][11].occupant.allegiance = 'friendly'
                this.board[11][11].isEmpty = false
            } else {
                return 'spawn location occupied'
            }
        }
        this.moveCard = (originalX, originalY, newX, newY) => {
            this.board[newY][newX] = this.board[originalY][originalX]
            this.board[originalY][originalX] = { isEmpty: true }
            this.board[newY][newX].occupant.movesLeft -= Math.abs(newY - originalY) + Math.abs(newX - originalX)
        }
        this.battle = (enemyX, enemyY) => {
            this.board[enemyY][enemyX].occupant.hp -= this.board[checkMoves.y][checkMoves.x].occupant.attack
            this.board[checkMoves.y][checkMoves.x].occupant.hp -= this.board[enemyY][enemyX].occupant.attack
            if (this.board[enemyY][enemyX].occupant.hp < 1) {
                this.board[enemyY][enemyX] = { isEmpty: true }
            }
            if (this.board[checkMoves.y][checkMoves.x].occupant.hp < 1) {
                this.board[checkMoves.y][checkMoves.x] = { isEmpty: true }
            }
        }
    }

}