import { Schema } from 'mongoose'
import { idGeneratorHelper } from '../../utils/helper.js'

const walletSchema = new Schema({
    walletId: {
        type: String,
        required: true,
        default: idGeneratorHelper('wlt'),
    },
    withdrawalsId: {
        type: [String],
        default: [],
    },
    depositId: {
        type: [String],
        default: [],
    },
    currentBalance: Number,
})

export default walletSchema
