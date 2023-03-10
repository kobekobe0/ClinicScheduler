import Users from '../../../models/User.js'
import checkAuth from '../../../utils/checkAuth.js'
import { GraphQLError } from 'graphql'
import * as dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'
import { APPOINTMENT_PER_PAGE } from '../../../utils/constants.js'
import Appointments from '../../../models/Appointment.js'

const userAppointment = async (parent, { appointmentId }, { token }) => {
    try {
        console.log('userAppointment query: started', { appointmentId })

        const auth = checkAuth(token)
        if (!auth) {
            throw new GraphQLError(
                'You are not authorized to perform this action.',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }

        const appointment = await Appointments.findOne({ _id: appointmentId })
        if (!appointment) {
            throw new GraphQLError('Cannot find the appointment', {
                extensions: {
                    code: 'INVALID ID',
                },
            })
        }
        let ids = []
        ids.push(appointment?.doctorId)
        ids.push(appointment?.patientId)

        if (!ids.includes(auth.userId)) {
            throw new GraphQLError(
                'You are not authorized to perform this action',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }

        return {
            appointmentId: appointment?._id,
            doctorId: appointment?.doctorId,
            patientId: appointment?.patientId,
            schedule: `${appointment?.schedule?.day}/${appointment?.schedule?.month}/${appointment?.schedule?.year}`,
            time: `${appointment?.schedule?.time}`,
            room: appointment?.room,
            isComplete: appointment?.isComplete,
            isCancelled: appointment?.isCancelled,
        }
    } catch (error) {
        console.error('userAppointment: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'SCHEDULER_QUERY_ERROR',
            },
            originalError: error,
        })
    }
}

const userAppointments = async (parent, { page }, { token }) => {
    try {
        console.log('userAppointments query: started')

        const auth = checkAuth(token)
        if (!auth) {
            throw new GraphQLError(
                'You are not authorized to perform this action.',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }

        const appointments = await Appointments.find({
            $or: [{ patientId: auth.userId }, { doctorId: auth.userId }],
        })
            .skip(page * APPOINTMENT_PER_PAGE)
            .limit(APPOINTMENT_PER_PAGE)
        if (!appointments) {
            throw new GraphQLError('Cannot find the appointment', {
                extensions: {
                    code: 'INVALID ID',
                },
            })
        }

        let queriedAppointments = []

        appointments.forEach((appointment) => {
            queriedAppointments.push({
                appointmentId: appointment?._id,
                doctorId: appointment?.doctorId,
                patientId: appointment?.patientId,
                schedule: `${appointment?.schedule?.day}/${appointment?.schedule?.month}/${appointment?.schedule?.year}`,
                time: `${appointment?.schedule?.time}`,
                room: appointment?.room,
                isComplete: appointment?.isComplete,
                isCancelled: appointment?.isCancelled,
            })
        })

        return queriedAppointments
    } catch (error) {
        console.error('userAppointments: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'SCHEDULER_QUERY_ERROR',
            },
            originalError: error,
        })
    }
}

const allAppointments = async (parent, { page }, { token }) => {
    try {
        console.log('userAppointments query: started')

        const auth = checkAuth(token)
        if (!auth) {
            throw new GraphQLError(
                'You are not authorized to perform this action.',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }
        if (auth.email != process.env.ADMIN_EMAIL) {
            throw new GraphQLError(
                'You are not authorized to perform this action. Admin level access.',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }

        const appointments = await Appointments.find()
            .skip(page * APPOINTMENT_PER_PAGE)
            .limit(APPOINTMENT_PER_PAGE)
        if (!appointments) {
            throw new GraphQLError('Cannot find the appointment', {
                extensions: {
                    code: 'INVALID ID',
                },
            })
        }

        let queriedAppointments = []

        appointments.forEach((appointment) => {
            queriedAppointments.push({
                appointmentId: appointment?._id,
                doctorId: appointment?.doctorId,
                patientId: appointment?.patientId,
                schedule: `${appointment?.schedule?.day}/${appointment?.schedule?.month}/${appointment?.schedule?.year}`,
                time: `${appointment?.schedule?.time}`,
                room: appointment?.room,
                isComplete: appointment?.isComplete,
                isCancelled: appointment?.isCancelled,
            })
        })

        return queriedAppointments
    } catch (error) {
        console.error('userAppointments: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'SCHEDULER_QUERY_ERROR',
            },
            originalError: error,
        })
    }
}

export { userAppointment, userAppointments, allAppointments }
