import { Schema } from 'mongoose'
import { idGeneratorHelper } from '../../utils/helper.js'

const notificationSchema = new Schema({
    walletId: {
        type: String,
        required: true,
        default: idGeneratorHelper('ntf'),
    },
    message: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
    opened: {
        type: Boolean,
        required: true,
        default: false,
    },
})

export default notificationSchema
