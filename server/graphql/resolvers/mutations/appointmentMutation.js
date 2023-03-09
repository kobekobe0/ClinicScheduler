import * as dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'
import { GraphQLError } from 'graphql'

import {
    idGeneratorHelper,
    loginTokenHelper,
    randomStringGenerator,
} from '../../../utils/helper.js'
import checkAuth from '../../../utils/checkAuth.js'
import Appointments from '../../../models/Appointment.js'
import Users from '../../../models/User.js'

const createAppointment = async (
    parent,
    { appointmentInput: { doctorId, patientId, room, time, day, year } },
    { token }
) => {
    try {
        console.log('createAppointment: started', {
            doctorId,
            patientId,
            room,
            time,
            day,
            year,
        })

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

        const doctor = await Users.findOne({ _id: doctorId })
        if (!doctor) {
            throw new GraphQLError('Cannot find the doctor', {
                extensions: {
                    code: 'INVALID DOCTOR',
                },
            })
        }

        const patient = await Users.findOne({ _id: patientId })
        if (!patient) {
            throw new GraphQLError('Cannot find the patient', {
                extensions: {
                    code: 'INVALID PATIENT',
                },
            })
        }

        const appointment = await Appointments.findOne({
            doctorId: doctorId,
            patientId: patientId,
        })
        if (!appointment) {
            const newAppointment = await Appointments.create({
                createdAt: Date.now(),
                doctorId: doctorId,
                patientId: patientId,
                schedule: {
                    time: time,
                    day: day,
                    year: year,
                },
            })

            if (!newAppointment) {
                throw new Error({
                    success: false,
                    message: 'Something went wrong when creating appointment',
                })
            }

            return {
                success: true,
                message: 'Successfully created the appointment',
            }
        } else {
            throw new Error('Appointment already exists')
        }
    } catch (error) {
        console.error('createAppointment: exception occurred', {
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

export { createAppointment }
