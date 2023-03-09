import * as dotenv from 'dotenv'
dotenv.config()

import gql from 'graphql-tag'

const walletTypDefs = gql`
    type Wallet {
        walletId: String
        withdrawalsId: [String]
        depositId: [String]
        currentBalance: Float
    }

    type MoneyProcess {
        amount: Float
        processId: String
        status: String
        accountNumber: String
        type: String
    }

    input ProcessInput {
        type: String
        userId: String
    }

    type Query {
        userWallet(walletId: String): Wallet
        moneyProcesses(processInput: ProcessInput!): [MoneyProcess]
    }

    type Mutation {
        #authentication related
        loginWithPassword(loginInputUser: LoginInput!): AuthResponse
    }
`

export default walletTypDefs
