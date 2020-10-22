import React from 'react'
import { useMain } from '../../context/main'

export default function DevCommands() {
    const { setBoard, board, drawCard } = useMain()

    const random = () => {
        return Math.floor((Math.random() * board.length))
    }

    const randomFriendly = () => {
        const random0 = random()
        const random1 = random()
        if (board[random0][random1].isEmpty === true) {
            let newBoard = board
            newBoard[random0][random1].isEmpty = false
            newBoard[random0][random1].occupant = { allegience: 'friendly' }
            setBoard([...newBoard])
        }
    }

    const randomEnemy = () => {
        const random0 = random()
        const random1 = random()

        const random2 = random()
        const random3 = random()
        if (board[random0][random1].isEmpty === true) {
            let newBoard = board
            newBoard[random0][random1].isEmpty = false
            newBoard[random0][random1].occupant = { allegiance: 'enemy', attack: random2, hp: random3 }
            setBoard([...newBoard])
        } else {
            randomEnemy()
        }
    }

    const randomNeutral = () => {
        const random0 = random()
        const random1 = random()
        if (board[random0][random1].isEmpty === true) {
            let newBoard = board
            newBoard[random0][random1].isEmpty = false
            newBoard[random0][random1].occupant = { allegiance: 'neutral' }
            setBoard([...newBoard])
        }
    }

    return (
        <div>
            <button onClick={randomFriendly}>add random friendly</button>
            <button onClick={randomNeutral}>add random neutral</button>
            <button onClick={randomEnemy}>add random enemy</button>
            <button onClick={drawCard}>draw</button>
        </div>
    )
}
