import * as dotenv from 'dotenv'
dotenv.config()
import gql from 'graphql-tag'

const appointmentTypeDefs = gql`
    type Appointment {
        appointmentId: String
        doctorId: String
        patientId: String
        schedule: String #concatenate number
        room: String
        isComplete: Boolean
    }

    type AppoinmentResponse {
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
    }

    type Query {
        userAppointMent(userId: String): Appointment
        allAppointMents: [Appointment]
        doctorAppointments(doctorId: String): [Appointment]
    }

    type Mutation {
        createAppointMent(
            appointmentInput: AppointmentInput
        ): AppointmentResponse
        updateAppointMent(appointmentInput): AppoinmentResponse
        cancelAppointment(appointmentId: String): AppoinmentResponse
        completeAppointment(appointmentId: String): AppoinmentResponse
    }
`

export default appointmentTypeDefs
