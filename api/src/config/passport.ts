import passport from "passport"
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";

class PassportAuthentification {
    private passport = passport

    constructor() {
        this.passport.serializeUser((user: Express.User, done) => done(null, user))
        this.passport.deserializeUser((user: Express.User, done) => done(null, user))
    }

    private async initPassportAuthentification() {
        const option = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_KEY || "TOKEN_KEY"
        }

        passport.use(
            new JwtStrategy(option, async(payload, done) => {
                return done(null, {firstName: "Hello"})
            })
        )
    }
}

export default PassportAuthentification