import * as dotenv from 'dotenv'
dotenv.config()

import gql from 'graphql-tag'

const userTypeDefs = gql`
    #    type Account {
    #     id: ID!
    #     fullName: String
    #     username: String
    #   }

    #TODO
    #Add doctor type
    #Add query for all doctors

    type CurrentUser {
        userId: ID #_id
        name: String
        email: String
        accountSetupProgress: String
        referralCode: String
        type: String
        specialization: String
        #type = [doctor, patient]
        # doctor's account can only be created by admins
        #token: String
    }

    type User {
        userId: ID
        name: String
        type: String
        email: String
        #pfp will be queried using userID
    }

    input LoginInput {
        email: String!
        password: String!
        keepLogin: Boolean!
    }

    input RegisterInput {
        name: String!
        email: String!
        password: String!
        confirmPassword: String!
        acceptedAllPolicies: Boolean!
        phoneNumber: String!
    }
    input RegisterInputDoctor {
        name: String!
        email: String!
        password: String!
        confirmPassword: String!
        acceptedAllPolicies: Boolean!
        specialization: String!
        phoneNumber: String!
    }

    type ConfirmationAccount {
        userId: String
        confirmed: Boolean
    }

    type AuthResponse {
        token: String!
        # userId: String!
    }

    type ConfirmationCompletedSignup {
        accountSetupProgress: String!
        userId: String!
    }

    input UpdateUserProfileInformationInput {
        username: String
        fullName: String
        profileBio: String
    }

    type ConfirmationUpdateProfileInformation {
        confirmed: Boolean!
        username: String!
        fullName: String!
        profileBio: String!
    }

    type SocialMedia {
        type: String
        label: String
        link: String!
    }

    input ChangePasswordInput {
        secureCode: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        currentUser: CurrentUser
        checkIfSecureCodeIsValid(secureCode: String!): Boolean
        findUser(email: String): CurrentUser
        findUsers(name: String): [User]
    }

    type Mutation {
        #authentication related
        loginWithPassword(loginInputUser: LoginInput!): AuthResponse
        createUser(registerInputUser: RegisterInput!): AuthResponse
        createDoctorAccount(
            registerInputUser: RegisterInputDoctor!
        ): AuthResponse
        verifyAccount(verificationCode: String!): ConfirmationAccount
        resendVerification: Boolean
        emailAddressLookUp(email: String!): Boolean
        changePasswordSecurely(
            changePasswordSecurelyInput: ChangePasswordInput!
        ): Boolean
    }
`

export default userTypeDefs
