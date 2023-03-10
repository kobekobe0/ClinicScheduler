import {
    createUser,
    loginWithPassword,
    createDoctorAccount,
} from './mutations/userMutation.js'

import {
    userAppointment,
    userAppointments,
} from './queries/appointmentQuery.js'

import {
    createAppointment,
    updateAppointMent,
    cancelAppointment,
    completeAppointment,
} from './mutations/appointmentMutation.js'

import { findUser, findUsers } from './queries/userQuery.js'
const UserResolvers = {
    Query: { findUser, findUsers, userAppointment, userAppointments },
    Mutation: {
        createUser,
        loginWithPassword,
        createDoctorAccount,
        createAppointment,
        updateAppointMent,
        cancelAppointment,
        completeAppointment,
    },
}
export default UserResolvers

/*TODO
- verifyAccount mutation
- sending verification to user's email
- changePassword
- update profile
*/
