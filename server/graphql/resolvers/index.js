import { createUser, loginWithPassword } from './mutations/userMutation.js'
const UserResolvers = {
    Query: {},
    Mutation: { createUser, loginWithPassword },
}
export default UserResolvers

/*TODO
- verifyAccount mutation
- sending verification to user's email
- changePassword
- update profile
*/
