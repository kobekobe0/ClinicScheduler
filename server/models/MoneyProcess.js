import { model } from 'mongoose'
import MoneyProcess from './schema/moneyProcessSchema'

const MoneyProcess = model('MoneyProcess', MoneyProcess, 'moneyProcess')

export default MoneyProcess
