import Users from "../models/Users.js";
// var GoogleStrategy = require("passport-google-oauth2").Strategy;
import GoogleStrategy from "passport-google-oauth2";
import { GraphQLError } from "graphql";
import { idGeneratorHelper } from "./helper.js";

const googleAuth = async (passport) => {
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
        console.log("loginWithGoogle: started", { email: profile._json.email });
        const user = await Users.findOne({
          "email.address": profile._json.email,
        });

        if (!user) {
          console.log("loginWithGoogle: creating a user", {
            email: profile._json.email,
          });
          try {
            const authServicesObj = {
              isGoogleSignIn: true,
            };
            const emailObj = {
              address: profile._json.email,
              verified: profile._json.email_verified,
            };
            const profileInfoObj = {
              username: profile._json.email?.split("@")[0].toLowerCase(),
              fullName: profile._json.name,
            };
            const newUser = await Users.create({
              _id: idGeneratorHelper("usr"),
              createdAt: new Date(),
              email: emailObj,
              authServices: authServicesObj,
              profile: profileInfoObj,
              roles: [process.env.ROLE_APP_USER, process.env.ROLE_JOBSEEKER],
              profileImageURL: profile?._json.picture || "",
              accountSetupProgress: "verify-account",
              acceptedAllPolicies: true, //can show a modal first after google signin button, if user doesnt agree, do not proceed
            });
            console.log(newUser);
            done(null, newUser);
          } catch (error) {
            console.error("loginWithGoogle: exception occurred", {
              errorMessage: error?.message,
              details: { error },
            });
            throw new GraphQLError(`See Errors: ${error?.message}`, {
              extensions: {
                code: error?.extensions?.code || "MEDSURFAPI_MIDDLEWARE_ERROR",
              },
              originalError: error,
            });
          }
        } else {
          console.log("loginWithGoogle: user exists", {
            email: profile._json.email,
          });
          // if email is already been used, logged the user in
          done(null, user);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    process.nextTick(function () {
      return done(null, user);
    });
  });

  passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
      return done(null, user);
    });
  });
};
export default googleAuth;
