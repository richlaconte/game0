const WebSocket = require('ws')
const Board = require('./board')

const wss = new WebSocket.Server({ port: 8080 })

const board = new Board

let visitors = [

]

const visitor = (ip) => {
    let obj = {
        id: visitors.length,
        ip,
        turn: {
            isTurn: false,
            movesTotal: 10,
            movesRemaining: 10
        }
    }
    visitors.push(obj)
    return obj
}

const sendBoard = (wss) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(board))
        }
    })
}

wss.on('connection', function connection(ws, req) {
    sendBoard(wss)
    const ip = req.socket.remoteAddress
    let thisVisitor = visitor(ip)
    console.log('new connection')
    console.log(thisVisitor)
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message)
        console.log(data)
        if (data.type === 'spawnCard') {
            board.spawnCard(data.payload)
            sendBoard(wss)
        }
        if (data.type === 'moveCard') {
            // THIS NEEDS TO BE CHECKED SERVER SIDE (if enough moves)
            board.moveCard(
                data.payload.originalX,
                data.payload.originalY,
                data.payload.newX,
                data.payload.newY
            )
            sendBoard(wss)
        }
    })

    ws.on('close', () => {
        visitors = visitors.filter(visitor => visitor.id !== thisVisitor.id)
        console.log(visitors)
    })
})