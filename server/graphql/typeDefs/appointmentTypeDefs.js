import * as dotenv from 'dotenv'
dotenv.config()
import gql from 'graphql-tag'

const AppointmentTypeDefs = gql`
    type Appointment {
        appointmentId: String
        doctorId: String
        patientId: String
        schedule: String #concatenate number
        time: String
        room: String
        isComplete: Boolean
        isCancelled: Boolean
    }

    type AppointmentResponse {
        success: Boolean
        message: String
    }

    input AppointmentInput {
        doctorId: String
        patientId: String
        room: String
        time: Float #use 24-hour format
        day: Int
        year: Int
        month: Int
    }

    input AppointmentInputUpdate {
        appointmentId: ID
        room: String
        time: Float #use 24-hour format
        month: Int
        day: Int
        year: Int
    }

    input UserAppointmentInput {
        userId: ID
        appointmentID: ID
    }

    type Query {
        userAppointment(appointmentId: String): Appointment
        userAppointments(page: Int): [Appointment]
        allAppointments(page: Int): [Appointment] #admin level
        doctorAppointments(doctorId: String): [Appointment]
    }

    type Mutation {
        createAppointment(
            appointmentInput: AppointmentInput
        ): AppointmentResponse
        updateAppointMent(
            appointmentInput: AppointmentInputUpdate
        ): AppointmentResponse
        cancelAppointment(appointmentId: String): AppointmentResponse
        completeAppointment(appointmentId: String): AppointmentResponse
    }
`

export default AppointmentTypeDefs
