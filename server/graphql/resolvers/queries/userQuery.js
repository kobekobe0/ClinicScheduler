import Users from '../../../models/User.js'
import checkAuth from '../../../utils/checkAuth.js'
import { GraphQLError } from 'graphql'
import * as dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'
import { USER_PER_PAGE } from '../../../utils/constants.js'

const findUser = async (parent, { email }, { token }) => {
    try {
        console.log('finding a user: started', { email })

        const user = await Users.findOne({ 'email.address': email })
        if (!user) {
            throw new Error("Can't find user or user didn't exists")
        }
        return {
            userId: user?._id,
            name: user?.profile,
            email: user?.email?.address,
            accountSetupProgress: user?.accountSetupProgress,
            type: user?.type,
        }
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

const findUsers = async (parent, { name, page }, { token }) => {
    try {
        console.log('finding users: started', { name: name, page: page })
        //pagination
        const users = await Users.find({ profile: name })
            .skip(page * USER_PER_PAGE)
            .limit(USER_PER_PAGE)

        let queried

        return users
    } catch (error) {
        console.error('findUsers: exception occurred', {
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

export { findUser, findUsers }
