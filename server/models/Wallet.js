import { model } from 'mongoose'
import walletSchema from './schema/walletSchema.js'

const Wallets = model('Wallets', walletSchema, 'wallets')

export default Wallets
