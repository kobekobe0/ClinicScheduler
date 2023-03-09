import { Schema } from 'mongoose'
import { idGeneratorHelper } from '../../utils/helper.js'

const authServicesSchema = new Schema(
    {
        password: String,
        authToken: String,
        keepLogin: Boolean,
    },
    { _id: false }
)

const emailInfoSchema = new Schema(
    {
        address: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true,
        },
        verified: Boolean,
        verificationEmailSent: Boolean,
        verificationCode: String,
    },
    { _id: false }
)

const profileInfoSchema = new Schema(
    {
        //global
        name: {
            type: String,
            required: true,
            text: true,
        },
    },
    { _id: false }
)

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
        default: idGeneratorHelper('usr'),
    },
    updatedAt: Date,
    createdAt: {
        type: Date,
        required: true,
    },
    email: {
        type: emailInfoSchema,
        required: true,
    },
    authServices: {
        type: authServicesSchema,
        required: true,
    },
    profile: String,
    accountSetupProgress: {
        //signup-moreinfo//
        type: String,
        required: true,
    },
    walletId: {
        type: String,
        required: true,
    },
    referralCode: String,
})

export default userSchema
