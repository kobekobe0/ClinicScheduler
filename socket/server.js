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
    /* data will look like:
        {
            message:
            link: link to new page that will show the appointment details
            type: [to be arranged] - img will be based on here
            from: --userId: (will be used to query the profile picture)--
            read: boolean (to display number of new notification in the notification logo)
            opened: boolean (to highlight wether the notification is opened or not)
        }
    */
    socket.on('send-notification', (data, userId) => {
        console.log(data)
        //send the data notification to the user
        socket.to(userId).emit('receive-notification', data)
    })
})

server.listen(3000, () => {
    console.log('Server is listening on port 3000')
})
