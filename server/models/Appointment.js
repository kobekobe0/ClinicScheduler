import { model } from 'mongoose'
import AppointmentSchema from './schema/appointmentSchema'

const Appointments = model('Appointments', AppointmentSchema, 'appointments')

export default Appointments
