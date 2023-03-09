import { EMAIL_REGEX } from "./constants.js";

/**
 * To validate if the email is a valid email address
 *
 * @param {String} email
 * @returns {Boolean}
 */

export const validateEmail = (email) => EMAIL_REGEX?.test(email);
