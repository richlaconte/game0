const WebSocket = require('ws')
const Board = require('./board')

const wss = new WebSocket.Server({ port: 8080 })

const board = new Board

const visitors = [
    'test'
]

const visitor = () => {

}

wss.on('connection', function connection(ws) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(board))
        }
    })
    console.log(ws.id)
    console.log('new connection')
    ws.on('message', function incoming(message) {
        const messageObject = JSON.parse(message)
        addMessage(messageObject.name, messageObject.content)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(messages));
            }
        })
    })
})