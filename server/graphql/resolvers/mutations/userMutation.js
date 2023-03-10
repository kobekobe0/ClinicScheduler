import * as dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'
import { GraphQLError } from 'graphql'

import {
    idGeneratorHelper,
    loginTokenHelper,
    randomStringGenerator,
} from '../../../utils/helper.js'
import { validateEmail } from '../../../utils/validations.js'
//import { sendEmail } from '../../../utils/mail.js'
import checkAuth from '../../../utils/checkAuth.js'

import Users from '../../../models/User.js'

import {
    EMAIL_REGEX,
    SOCIAL_REGEX,
    WEBSITE_REGEX,
    SHORTSITE_REGEX,
    MAX_LABEL_TYPE_LENGTH,
    MAX_LINK_LENGTH,
    MAX_USERNAME_LENGTH,
    MIN_USERNAME_LENGTH,
    MAX_FULLNAME_LENGTH,
    MIN_FULLNAME_LENGTH,
    MAX_PROFILEBIO_LENGTH,
} from '../../../utils/constants.js'
import { jwtAccessSign } from '../../../utils/jwtAccess.js'
import Wallets from '../../../models/Wallet.js'
//import Companies from '../../../models/Companies.js'

/**
 * Login using email and password func will return authorized token for login session
 *
 * @param {*} parent
 * @param {*} param1
 * @param {*} param2
 * @returns {*} user information
 */

const loginWithPassword = async (
    parent,
    { loginInputUser: { email, password, keepLogin } },
    { token }
) => {
    try {
        console.log('loginWithPassword: started', { email })
        // TODO:  make sure user not tried logging in twice (maybe in client-side??)

        const user = await Users.findOne({ 'email.address': email })
        if (user) {
            const matchPassword = await bcrypt.compare(
                password,
                user?.authServices?.password
            )
            if (!matchPassword) {
                throw new Error('Invalid password')
            }
            await Users.updateOne(
                { _id: user?._id },
                { token: loginTokenHelper(), keepLogin }
            )

            // const jwtTokenSigned = jwt.sign(
            //   {
            //     id: user?._id,
            //     email: user?.email?.address,
            //     username: user?.profile?.username,
            //   },
            //   process.env.APP_SECRET_KEY || "dev",
            //   { algorithm: "HS256", subject: user?._id, expiresIn: "24h" }
            // );

            const signedToken = jwtAccessSign(user?._id, user?.email?.address)

            return {
                token: signedToken,
            }
        } else {
            throw new Error('User not found.')
        }
    } catch (error) {
        console.error('loginWithPassword: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'MEDSURFAPI_MUTATION_ERROR',
            },
            originalError: error,
        })
    }
}
/**
 * Allow user to sign up with required information
 *
 * @param {*} parent
 * @param {*} input
 * @param {*} context
 * @return {*}
 *
 */
const createUser = async (
    parent,
    {
        registerInputUser: {
            name,
            email,
            password,
            confirmPassword,
            acceptedAllPolicies,
            phoneNumber,
        },
    },
    { token }
) => {
    try {
        console.log('createUser: started', {
            name,
            email,
            password,
            confirmPassword,
            acceptedAllPolicies,
            phoneNumber,
        })

        const user = await Users.findOne({ 'email.address': email })
        if (user === null) {
            let errs = []

            if (!name) {
                errs.push('Valid Name is required')
            }

            if (validateEmail(email) === false) {
                errs.push('Valid Email is required')
            }

            if (password !== confirmPassword) {
                errs.push('Password do not match')
            }

            if (!phoneNumber) {
                errs.push('Phone number is required')
            }

            if (errs?.length) {
                console.log(errs)
                throw new Error(errs)
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const confirmAccountToken = loginTokenHelper()

            const newUser = await Users.create({
                createdAt: new Date(),
                profile: name,
                email: {
                    address: email,
                    verificationEmailSent: true,
                    verified: false,
                    verificationCode: confirmAccountToken,
                },
                authServices: {
                    password: hashedPassword,
                    isGoogleSignIn: false,
                },
                active: true,
                acceptedAllPolicies,
                accountSetupProgress: 'verify-account',
                type: 'PATIENT',
                phoneNumber: phoneNumber,
                referralCode:
                    'make a helper that generates referral code, make referralCode unique on schema',
            })
            console.log('createUser: user created', {
                newUserInformation: newUser,
            })
            // if (newUser) {
            //     //we dont wait for send email
            //     sendEmail(
            //         process.env.MEDSURF_EMAIL || 'admin@medsurf.co',
            //         newUser?.email?.address,
            //         'Confirm your account',
            //         'Please verify your account to continue using MedSurf platform. Thank you!',
            //         `<br><br><h2>Hello ${newUser?.profile?.fullName}, Welcome to MedSurf. Please verify your account now 🚀</h2><br><br><h1>${confirmAccountToken} (code)</h1>`
            //     )
            //     return {
            //         token: jwtAccessSign(
            //             newUser?._id,
            //             newUser?.email?.address,
            //             newUser?.profile?.username
            //         ),
            //     }
            // } else {
            //     throw new Error('Internal server error unable to register')
            // }
        } else {
            throw new Error('User already exists')
        }
    } catch (error) {
        console.error('createUser: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'MEDSURFAPI_MUTATION_ERROR',
            },
            originalError: error,
        })
    }
}

const createDoctorAccount = async (
    parent,
    {
        registerInputUser: {
            name,
            email,
            password,
            confirmPassword,
            acceptedAllPolicies,
            specialization,
            phoneNumber,
        },
    },
    { token }
) => {
    try {
        console.log(
            'createUser: started',
            {
                name,
                email,
                password,
                confirmPassword,
                acceptedAllPolicies,
                phoneNumber,
                specialization,
            },
            { token }
        )

        //check whether admin is creating the account, see what decoded token looks like and add check if it is admin
        const auth = checkAuth(token)
        if (!auth) {
            throw new GraphQLError(
                'You are not authorized to perform this action.',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }

        if (auth.email != process.env.ADMIN_EMAIL) {
            throw new GraphQLError(
                'You are not authorized to perform this action. Admin level access.',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }

        const user = await Users.findOne({ 'email.address': email })
        if (user === null) {
            let errs = []

            if (!name) {
                errs.push('Valid Name is required')
            }

            if (validateEmail(email) === false) {
                errs.push('Valid Email is required')
            }

            if (password !== confirmPassword) {
                errs.push('Password do not match')
            }

            if (!phoneNumber) {
                errs.push('Phone number is required')
            }

            if (!specialization) {
                errs.push('Specialization is required')
            }

            if (errs?.length) {
                console.log(errs)
                throw new Error(errs)
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const confirmAccountToken = loginTokenHelper()

            const newUser = await Users.create({
                createdAt: new Date(),
                profile: name,
                email: {
                    address: email,
                    verificationEmailSent: true,
                    verified: false,
                    verificationCode: confirmAccountToken,
                },
                authServices: {
                    password: hashedPassword,
                    isGoogleSignIn: false,
                },
                active: true,
                acceptedAllPolicies,
                accountSetupProgress: 'verified',
                type: 'DOCTOR',
                specialization: specialization,
                phoneNumber: phoneNumber,
            })
            console.log('createUser: user created', {
                newUserInformation: newUser,
            })
            // if (newUser) {
            //     //we dont wait for send email
            //     sendEmail(
            //         process.env.MEDSURF_EMAIL || 'admin@medsurf.co',
            //         newUser?.email?.address,
            //         'Confirm your account',
            //         'Please verify your account to continue using MedSurf platform. Thank you!',
            //         `<br><br><h2>Hello ${newUser?.profile?.fullName}, Welcome to MedSurf. Please verify your account now 🚀</h2><br><br><h1>${confirmAccountToken} (code)</h1>`
            //     )
            //     return {
            //         token: jwtAccessSign(
            //             newUser?._id,
            //             newUser?.email?.address,
            //             newUser?.profile?.username
            //         ),
            //     }
            // } else {
            //     throw new Error('Internal server error unable to register')
            // }
        } else {
            throw new Error('User already exists')
        }
    } catch (error) {
        console.error('createUser: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'MEDSURFAPI_MUTATION_ERROR',
            },
            originalError: error,
        })
    }
}

/**
 * Resend Email containing verification code
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} param2
 *
 */

// const resendVerification = async (parent, args, { token }) => {
//     try {
//         console.log('resendVerification: started', {})

//         const auth = checkAuth(token)
//         if (!auth) {
//             throw new GraphQLError(
//                 'You are not authorized to perform this action.',
//                 {
//                     extensions: {
//                         code: 'FORBIDDEN',
//                     },
//                 }
//             )
//         }

//         const user = await Users.findOne({
//             _id: auth?.userId,
//             'email.verified': false,
//         }).exec()

//         if (user) {
//             const code = loginTokenHelper()
//             await Users.updateOne(
//                 { _id: user._id },
//                 { 'email.verificationCode': code }
//             )

//             sendEmail(
//                 process.env.MEDSURF_EMAIL || 'admin@medsurf.co',
//                 user?.email?.address,
//                 'Confirm your account',
//                 'Please verify your account to continue using MedSurf platform. Thank you!',
//                 `<br><br><h2>Hello ${user?.profile?.fullName}, Welcome to MedSurf. Please verify your account now 🚀</h2><br><br><h1>${code} (code)</h1>`
//             )

//             return true
//         } else {
//             return false
//         }
//     } catch (error) {
//         console.error('resendVerification: exception occurred', {
//             errorMessage: error?.message,
//             details: { error },
//         })
//         throw new GraphQLError(`See Errors: ${error?.message}`, {
//             extensions: {
//                 code: error?.extensions?.code || 'MEDSURFAPI_MUTATION_ERROR',
//             },
//             originalError: error,
//         })
//     }
// }

/**
 * Update account to be verified base on the verification code passed
 *
 * @param {*} parent
 * @param {String} param1.verificationCode
 * @param {*} param2
 * @returns Object
 */

// const verifyAccount = async (parent, { verificationCode }, { token }) => {
//     try {
//         console.log('verifyAccount: started', { verificationCode })

//         const auth = checkAuth(token)
//         if (!auth) {
//             throw new GraphQLError(
//                 'You are not authorized to perform this action.',
//                 {
//                     extensions: {
//                         code: 'FORBIDDEN',
//                     },
//                 }
//             )
//         }

//         const user = await Users.findOne({
//             _id: auth?.userId,
//             'email.verificationCode': verificationCode,
//             'email.verificationEmailSent': true,
//         }).exec()
//         if (user) {
//             console.log('verifyAccount: activate user', { verificationCode })
//             //update user to be active
//             const code = loginTokenHelper()
//             await Users.updateOne(
//                 { _id: user._id },
//                 {
//                     'email.verified': true,
//                     'email.verificationCode': code,
//                     'email.verificationEmailSent': false,
//                     accountSetupProgress: 'pending-profile',
//                 }
//             )
//             return {
//                 userId: auth?.userId,
//                 confirmed: true,
//             }
//         } else {
//             console.log('verifyAccount: user not found', { verificationCode })
//             return {
//                 userId: auth?.userId,
//                 confirmed: false,
//             }
//         }
//     } catch (error) {
//         console.error('verifyAccount: exception occurred', {
//             errorMessage: error?.message,
//             details: { error },
//         })
//         throw new GraphQLError(`See Errors: ${error?.message}`, {
//             extensions: {
//                 code: error?.extensions?.code || 'MEDSURFAPI_MUTATION_ERROR',
//             },
//             originalError: error,
//         })
//     }
// }

/**
 * Email look up if email exists we allow change password/forgot password workflow
 *
 * @param {*} parent
 * @param {String} param1.email
 * @param {*} context
 * @returns Boolean
 */

// const emailAddressLookUp = async (parent, { email }, context) => {
//     try {
//         console.log('emailAddressLookUp: started', { email })
//         const secureCode = randomStringGenerator()
//         const user = await Users.findOne({
//             'email.address': email,
//             'email.verified': true,
//         }).exec()
//         if (user) {
//             console.log(
//                 'emailAddressLookUp: sending and settings up secure link',
//                 {
//                     email,
//                 }
//             )
//             await Users.updateOne(
//                 { _id: user._id },
//                 {
//                     'email.verificationCode': String(secureCode),
//                     'email.verificationEmailSent': true,
//                 }
//             )
//             sendEmail(
//                 process.env.MEDSURF_EMAIL || 'admin@medsurf.co',
//                 user?.email?.address,
//                 'Change your password',
//                 'Change your password securely 🔑',
//                 `<br><br><h2>Hello ${user?.profile?.fullName}, We understand that you want to regain your account access. Please click this <a href="${process.env.CLIENT_HOSTNAME}/forgot-password?secure=${secureCode}" target="_blank">Link </a> to proceed with the password change.  🚀</h2><br><br> <b>Medsurf Team</b>`
//             )
//         }
//         return !!user
//     } catch (error) {
//         console.error('emailAddressLookUp: exception occurred', {
//             errorMessage: error?.message,
//             details: { error },
//         })
//         throw new GraphQLError(`See Errors: ${error?.message}`, {
//             extensions: {
//                 code: error?.extensions?.code || 'MEDSURFAPI_MUTATION_ERROR',
//             },
//             originalError: error,
//         })
//     }
// }

/**
 * Change password securely using the securecode provided on query link
 *
 * @param {*} parent
 * @param {String} param1.secureCode
 * @param {String} param1.password
 * @param {String} param1.confirmPassword
 * @param {*} context
 * @returns Boolean
 */

const changePasswordSecurely = async (
    parent,
    { changePasswordSecurelyInput: { secureCode, password, confirmPassword } },
    context
) => {
    try {
        console.log('changePasswordSecurely: started', {
            secureCode,
            password,
            confirmPassword,
        })
        const code = randomStringGenerator()
        const user = await Users.findOne({
            'email.verificationCode': secureCode,
            //'email.verified': true,
            //'email.verificationEmailSent': true,
        }).exec()
        if (user) {
            console.log('changePasswordSecurely: changing password', {})

            if (password !== confirmPassword) {
                console.log(
                    'changePasswordSecurely: password and confirm password do not match',
                    {}
                )
                return false
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const updatedUser = await Users.updateOne(
                { _id: user._id },
                {
                    'email.verificationCode': String(code),
                    'email.verificationEmailSent': false,
                    'authServices.password': hashedPassword,
                }
            )
            console.log('changePasswordSecurely: updated user', { updatedUser })
            return !!updatedUser?.modifiedCount > 0
        } else {
            console.log('changePasswordSecurely: user not found', {})
            return false
        }
    } catch (error) {
        console.error('changePasswordSecurely: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'MEDSURFAPI_MUTATION_ERROR',
            },
            originalError: error,
        })
    }
}

/**
 * [Admin] Create a Recruiter account from the sign up request of companies
 *
 * @param {*} parent
 * @param {String} param1.companyId
 * @param {*} context
 * @returns Boolean
 */

const updateUserProfileInformation = async (
    parent,
    { userProfileInformationInput: { username, fullName, profileBio } },
    { token }
) => {
    try {
        console.log('updateUserProfileInformation: started', {
            username,
            fullName,
            profileBio,
        })
        const auth = checkAuth(token)
        if (!auth) {
            throw new GraphQLError(
                'You are not authorized to perform this action.',
                {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                }
            )
        }

        //decoded token contains email, so I used that value
        //or should I ask for `user` header??? and use that value to query
        const userToBeUpdated = Users.findOne({ email: auth?.email })

        if (!userToBeUpdated) {
            throw new Error('Specific user cannot be found.')
        }

        let errs = []
        //prevent white spaces from being inputted
        if (
            username?.trim()?.length <= MIN_USERNAME_LENGTH ||
            username?.trim()?.length >= MAX_USERNAME_LENGTH
        ) {
            errs.push('Valid username is required.')
        }

        //checks if full name has numbers and special characters
        let fullNameFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

        if (!fullNameFormat?.test(fullName)) {
            if (
                fullName?.trim()?.length <= MIN_FULLNAME_LENGTH ||
                fullName?.trim()?.length >= MAX_FULLNAME_LENGTH
            ) {
                errs.push('Valid full name is required.')
            }
        } else {
            errs.push('Valid full name is required.')
        }

        if (profileBio?.length >= MAX_PROFILEBIO_LENGTH) {
            errs.push('Valid profile bio is required')
        }

        if (errs?.length) {
            console.log('Ivalid inputs: ', errs)
            throw new Error(errs)
        }

        await userToBeUpdated.update({
            updatedAt: new Date().toISOString(),
            username: username,
            fullName: fullName,
            profileBio: profileBio,
        })

        return {
            confirmed: true,
            username,
            fullName,
            profileBio,
        }
    } catch (error) {
        console.error('updateUserProfileInformation: exception occurred', {
            errorMessage: error?.message,
            details: { error },
        })
        throw new GraphQLError(`See Errors: ${error?.message}`, {
            extensions: {
                code: error?.extensions?.code || 'MEDSURFAPI_MUTATION_ERROR',
            },
            originalError: error,
        })
    }
}

export {
    loginWithPassword, // passed
    createUser, // passed
    //resendVerification, // passed
    // verifyAccount, // passed
    //emailAddressLookUp, // passed
    changePasswordSecurely, //passed
    updateUserProfileInformation,
    createDoctorAccount,
}
