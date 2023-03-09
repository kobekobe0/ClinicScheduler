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
            isComplete: false,
            isCancelled: false,
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

const updateAppointMent = async (
    parent,
    { appointmentInput: { appointmentId, room, time, day, year } },
    { token }
) => {
    try {
        console.log('updateAppointment: started', {
            appointmentId,
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

        const appointment = await Appointments.findOne({ _id: appointmentId })

        if (!appointment) {
            throw new GraphQLError('Cannot find the appointment', {
                extensions: {
                    code: 'APPOINTMENT NOT FOUND',
                },
            })
        }

        console.log(auth.userId == appointment.patientId)
        console.log(appointment.patientId)
        if (auth?.userId == appointment?.doctorId) {
            const updatedAppointment = await Appointments.findByIdAndUpdate(
                appointmentId,
                {
                    updatedAt: Date.now(),
                    schedule: {
                        day: day,
                        time: time,
                        year: year,
                    },
                    room: room,
                }
            )

            if (!updatedAppointment) {
                throw new GraphQLError(
                    'Something went wrong while updating the appointment',
                    {
                        extensions: {
                            code: 'FAILED',
                        },
                    }
                )
            }

            return {
                success: true,
                message: 'successfully updated the appointment',
            }
        } else {
            throw new GraphQLError('You are authorized to perform this task', {
                extensions: {
                    code: 'FORBIDDEN',
                },
            })
        }
        //TODO
        //Send notification to patient and doctors about the changes
    } catch (error) {
        console.error('updateAppointment: exception occurred', {
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

const cancelAppointment = async (parent, { appointmentId }, { token }) => {
    try {
        console.log('cancelAppointment: started', {
            appointmentId,
        })
        console.log(token)
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

        if (appointment.doctorId == auth.userId) {
            const canceledAppointment = await Appointments.findByIdAndUpdate(
                appointmentId,
                {
                    updatedAt: Date.now(),
                    isCancelled: true,
                }
            )

            if (!cancelAppointment) {
                throw new Error('failed to updated the appointment')
            }

            return {
                success: true,
                message: 'Successfully canceled the appointment',
            }
        } else {
            throw new GraphQLError(
                'You are not authorized to perform this task',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }

        const canceledAppointment = await Appointments.findByIdAndUpdate(
            appointmentId,
            {
                updatedAt: Date.now(),
                isCancelled: true,
            }
        )
    } catch (error) {
        console.error('cancelAppointment: exception occurred', {
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

export { createAppointment, updateAppointMent, cancelAppointment }
