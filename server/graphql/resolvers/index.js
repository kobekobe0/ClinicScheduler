import {
    createUser,
    loginWithPassword,
    createDoctorAccount,
} from './mutations/userMutation.js'
const UserResolvers = {
    Query: {},
    Mutation: { createUser, loginWithPassword, createDoctorAccount },
}
export default UserResolvers

/*TODO
- verifyAccount mutation
- sending verification to user's email
- changePassword
- update profile
*/
