import * as dotenv from 'dotenv'
dotenv.config()

// config
import startApolloServer from './config/startApolloServer.js'
import connectToMongoDB from './config/database.js'

// connect to database first
connectToMongoDB()

// start apollo server
startApolloServer()
