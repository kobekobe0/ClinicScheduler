import Users from '../../../models/User.js'
import checkAuth from '../../../utils/checkAuth.js'
import { GraphQLError } from 'graphql'
import * as dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'

const findUser = async (parent, { email }, { token }) => {
    try {
        console.log('finding a user: started', { email })

        const user = await Users.findOne({ 'email.address': email })
        if (!user) {
            throw new Error("Can't find user or user didn't exists")
        }
        return user
    } catch (error) {
        console.error('findUser: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'SCHEDULER_MUTATION_ERROR',
            },
            originalError: error,
        })
    }
}
