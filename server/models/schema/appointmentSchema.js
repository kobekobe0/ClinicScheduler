import { Schema } from 'mongoose'
import { idGeneratorHelper } from '../../utils/helper.js'

const dateSchema = new Schema({
    time: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
})

const appointmentSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: idGeneratorHelper('apt'),
    },
    updatedAt: Date,
    createdAt: {
        type: Date,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    schedule: {
        type: dateSchema,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    isCancelled: {
        type: Boolean,
        default: false,
    },
})

export default appointmentSchema
