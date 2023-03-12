import { model } from 'mongoose'
import notificationSchema from './schema/notificationSchema.js'

const Notifications = model('Notifications', notificationSchema, 'notification')

export default Notifications
