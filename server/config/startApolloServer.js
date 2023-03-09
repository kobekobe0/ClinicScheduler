import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import pkg from 'body-parser'
const { json } = pkg
import userTypeDefs from '../graphql/typeDefs/userTypeDefs.js'
import UserResolvers from '../graphql/resolvers/index.js'
import { makeExecutableSchema } from '@graphql-tools/schema'
import walletTypDefs from '../graphql/typeDefs/walletTypeDefs.js'
import AppointmentTypeDefs from '../graphql/typeDefs/appointmentTypeDefs.js'

const startApolloServer = async () => {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        schema: makeExecutableSchema({
            typeDefs: [userTypeDefs, walletTypDefs, AppointmentTypeDefs],
            resolvers: [UserResolvers],
        }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    await server.start()

    const whitelist = [
        'http://localhost:4000',
        'https://localhost:4000',
        'http://localhost:3000',
        'http://localhost:8000',
        'http://localhost:5000',
        'https://localhost:3000',
        'http://test-xasdsdcv.medsurf.co',
        'https://test-xasdsdcv.medsurf.co',
        'http://medsurf.co',
        'https://medsurf.co',
        'https://admin.medsurf.co',
        'https://admin-api.medsurf.co',
    ]

    const corsOptions = {
        origin: function (origin, callback) {
            if (
                whitelist.indexOf(origin) !== -1 ||
                typeof origin === 'undefined'
            ) {
                callback(null, true)
            } else {
                callback(new Error(`Not allowed by CORS: ${origin}`))
            }
        },
    }

    app.use(
        '/graphql',
        cors(corsOptions),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                return {
                    token: req?.headers?.authorization || '',
                }
            },
        })
    )

    const allowlist = ['http://localhost:3000']
    const corsOptionsDelegate = function (req, callback) {
        var corsOptions
        if (allowlist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
        } else {
            corsOptions = { origin: false } // disable CORS for this request
        }
        callback(null, corsOptions) // callback expects two parameters: error and options
    }

    await new Promise((resolve) =>
        httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
    )
    console.log(
        `🔑 ColorGame Server :::::::::: ${
            process.env.HOST_NAME || 'asdf'
        }/graphql`
    )
}

export default startApolloServer
