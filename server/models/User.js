import { model } from 'mongoose'
import userSchema from './schema/userSchema.js'

const Users = model('Users', userSchema, 'users')

export default Users
