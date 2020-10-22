import React, { useContext, useState, useEffect } from 'react'
const Context = React.createContext({})
const MainContextProvider = ({ children }) => {

    const [socket, setSocket] = useState({})
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState([])
    const [moves, setMoves] = useState(3)
    const [board, setBoard] = useState([])

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080')
        // Connection opened
        socket.addEventListener('open', function (event) {
            //socket.send('Hello Server!')
        })
        // Listen for messages
        socket.addEventListener('message', function (event) {
            const data = JSON.parse(event.data)
            console.log(data)
            if (data.board) {
                setBoard(JSON.parse(event.data).board)
            }
        })
        socket.addEventListener('board', (event) => {
            setBoard(JSON.parse(event.data))
        })

        setSocket(socket)
    }, [])

    const [checkMoves, setCheckMoves] = useState({
        active: false,
        x: 0,
        y: 0
    })

    const endTurn = () => {
        setMoves(3)
        setCheckMoves({
            active: false,
            x: 0,
            y: 0
        })

        let newBoard = board
        newBoard.forEach((row) => {
            row.forEach((cell) => {
                if (cell.isEmpty) {
                    return
                }

                cell.occupant.movesLeft = cell.occupant.speed
            })
        })
        setBoard([...newBoard])
    }

    const spawnCard = (card) => {
        if (board[11][11].isEmpty) {
            let newBoard = board
            newBoard[11][11].occupant = card
            newBoard[11][11].occupant.allegiance = 'friendly'
            newBoard[11][11].isEmpty = false

            setBoard([...newBoard])

            let newHand = hand.filter((item) => item !== card)

            setHand(newHand)
        } else {
            alert('spawn location occupied')
        }
    }

    const moveCard = (originalX, originalY, newX, newY) => {

        if ((Math.abs(newY - originalY) + Math.abs(newX - originalX)) > moves) {
            alert(`not enough moves remaining`)
            return
        }

        let newBoard = board
        newBoard[newY][newX] = newBoard[originalY][originalX]
        newBoard[originalY][originalX] = { isEmpty: true }
        newBoard[newY][newX].occupant.movesLeft -= Math.abs(newY - originalY) + Math.abs(newX - originalX)

        setBoard([...newBoard])
        setCheckMoves({
            active: false,
            x: 0,
            y: 0
        })
        console.log(`moving ${Math.abs(newY - originalY) + Math.abs(newX - originalX)} spaces`)
        setMoves(moves - (Math.abs(newY - originalY) + Math.abs(newX - originalX)))
    }

    const checkForMoves = (x, y) => {

        let obj

        if (board[y][x].occupant.movesLeft < 1) {
            return
        }

        if (x === checkMoves.x && y === checkMoves.y) {
            obj = {
                active: false,
                x: 0,
                y: 0
            }
        } else {
            obj = {
                active: true,
                x,
                y
            }
        }

        setCheckMoves(obj)
    }

    const battle = (enemyX, enemyY) => {
        let distance = Math.abs(enemyX - checkMoves.x) + Math.abs(enemyY - checkMoves.y)
        let newBoard = board
        newBoard[enemyY][enemyX].occupant.hp -= newBoard[checkMoves.y][checkMoves.x].occupant.attack
        newBoard[checkMoves.y][checkMoves.x].occupant.hp -= newBoard[enemyY][enemyX].occupant.attack
        if (newBoard[enemyY][enemyX].occupant.hp < 1) {
            newBoard[enemyY][enemyX] = { isEmpty: true }
            setCheckMoves({
                active: false,
                x: 0,
                y: 0
            })
        }
        if (newBoard[checkMoves.y][checkMoves.x].occupant.hp < 1) {
            newBoard[checkMoves.y][checkMoves.x] = { isEmpty: true }
            setCheckMoves({
                active: false,
                x: 0,
                y: 0
            })
        }
        setBoard([...newBoard])
        setMoves(moves - distance)
    }

    const [hand, setHand] = useState([
        {
            name: 'test0',
            speed: 1,
            movesLeft: 1,
            attack: 1,
            hp: 1
        },
        {
            name: 'test1',
            speed: 2,
            movesLeft: 2,
            attack: 2,
            hp: 2
        },
        {
            name: 'test2',
            speed: 3,
            movesLeft: 3,
            attack: 3,
            hp: 3
        }
    ])
    console.log(hand)

    const drawCard = () => {
        const card = {
            name: `test${Math.floor((Math.random() * 999))}`,
            speed: Math.floor((Math.random() * 3) + 1),
            attack: Math.floor((Math.random() * 5)),
            hp: Math.floor((Math.random() * 5) + 1)
        }

        let newHand = hand
        newHand.push(card)

        setHand([...newHand])
    }

    const value = {
        board,
        setBoard,
        hand,
        drawCard,
        checkMoves,
        checkForMoves,
        spawnCard,
        moveCard,
        moves,
        endTurn,
        battle
    }
    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default MainContextProvider
export const useMain = () => useContext(Context)