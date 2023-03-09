import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

/**
 * Check request if it has authorization with Bearer JWT token
 *
 * @param {String} token
 * @returns
 */

const checkAuth = (token) => {
  if (!token) return false;

  try {
    const tokenstr = token?.split("Bearer ")[1];
    if (!tokenstr) return false;
    const decoded = jwt.verify(tokenstr, process.env.APP_SECRET_KEY);
    console.log(decoded);
    return decoded;
  } catch (err) {
    throw new Error(`checkAuth error : ${err?.message}`);
  }
};

export default checkAuth;
