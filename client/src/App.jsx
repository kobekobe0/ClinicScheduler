import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { useEffect } from 'react'
import socket from './socket/socket'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
