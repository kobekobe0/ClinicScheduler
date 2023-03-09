import { model } from 'mongoose'
import AppointmentSchema from './schema/appointmentSchema.js'

const Appointments = model('Appointments', AppointmentSchema, 'appointments')

export default Appointments
