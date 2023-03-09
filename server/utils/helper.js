import { v4 as uuidv4 } from "uuid";

/**
 * Verification code and other stuff
 *
 * @returns String
 */
export const loginTokenHelper = () =>
  `${getRandomIntHelper(10)}${getRandomIntHelper(10)}${getRandomIntHelper(
    10
  )}${getRandomIntHelper(10)}${getRandomIntHelper(10)}${getRandomIntHelper(
    10
  )}`;

/**
 *
 * @param {Number} max
 * @returns Number
 */

export const getRandomIntHelper = (max) => Math.floor(Math.random() * max);

/**
 *
 * @param {String} prefix : ;
 * @returns String
 */

export const idGeneratorHelper = (prefix) =>
  `${prefix || "id"}_${uuidv4().slice(0, 15).replace("-", "")}`;

export const randomStringGenerator = () => uuidv4().replace("-", "");
