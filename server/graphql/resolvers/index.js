import {
    createUser,
    loginWithPassword,
    createDoctorAccount,
} from './mutations/userMutation.js'

import {
    createAppointment,
    updateAppointMent,
    cancelAppointment,
} from './mutations/appointmentMutation.js'

import { findUser, findUsers } from './queries/userQuery.js'
const UserResolvers = {
    Query: { findUser, findUsers },
    Mutation: {
        createUser,
        loginWithPassword,
        createDoctorAccount,
        createAppointment,
        updateAppointMent,
        cancelAppointment,
    },
}
export default UserResolvers

/*TODO
- verifyAccount mutation
- sending verification to user's email
- changePassword
- update profile
*/
