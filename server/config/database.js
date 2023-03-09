import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
mongoose.set('strictQuery', false)
/**
 * Connect to Mongodb database through mongodb uri privately provided and mongoose
 *
 * @return {Promise}
 */

const connectToMongoDB = () => {
    return mongoose.connect(
        process.env.MONGODB_URI || 'invalid',
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error) => {
            if (error) {
                console.error('Failed to connect to MongoDB: details', {
                    errorMessage: error?.message,
                    details: { error },
                })
            } else {
                console.log('====== MongoDB Connection established. ======')
            }
        }
    )
}

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error'))

export default connectToMongoDB
