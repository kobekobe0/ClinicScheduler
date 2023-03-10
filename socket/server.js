import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const corsOptions = {
    origin: 'http://127.0.0.1:5173/',
}

app.use(cors(corsOptions))

// Add headers before the routes are defined

io.on('connection', (socket) => {
    console.log(`User connected with ID ${socket.id}`)

    socket.on('disconnect', () => {
        console.log(`User disconnected with ID ${socket.id}`)
    })

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`)
        io.emit('message')
    })
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000')
})
