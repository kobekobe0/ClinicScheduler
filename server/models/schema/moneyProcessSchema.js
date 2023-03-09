import { Schema } from 'mongoose'
import { idGeneratorHelper } from '../../utils/helper.js'

const moneyProcessSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    processId: {
        type: String,
        required: true,
        default: idGeneratorHelper('prc'),
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    accountNumber: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
})

export default moneyProcessSchema
