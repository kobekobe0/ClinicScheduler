import { createUser, loginWithPassword } from './mutations/userMutation.js'
const UserResolvers = {
    Query: {},
    Mutation: { createUser, loginWithPassword },
}
export default UserResolvers
