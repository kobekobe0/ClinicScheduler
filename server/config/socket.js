import io from 'socket.io-client'
import * as dotenv from 'dotenv'
dotenv.config()

const socket = io(process.env.SOCKET_SERVER)

export default socket
