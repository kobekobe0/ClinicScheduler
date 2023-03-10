import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import socket from './socket/socket.js'

socket.connect()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
