import jwt from 'jsonwebtoken'
/**
 *
 * Sign JWT
 *
 * @param {String} userId
 * @param {String} email
 * @param {String} username
 * @param {String} expiration
 * @returns JSON WEB TOKEN
 */
export const jwtAccessSign = (userId, email, username, expiration) =>
    jwt.sign(
        {
            userId,
            email,
        },
        process.env.APP_SECRET_KEY || 'dev',
        { expiresIn: '24h' }
    )
