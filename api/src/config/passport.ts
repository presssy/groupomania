import passport from "passport"
import Services from "@/services";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";

class PassportAuthentification {
    private passport = passport
    private service = new Services()

    constructor() {
        this.initPassportAuthentification()
        this.passport.serializeUser((user: Express.User, done) => done(null, user))
        this.passport.deserializeUser((user: Express.User, done) => done(null, user))
    }

    private initPassportAuthentification() {
        const option = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.TOKEN_KEY || "TOKEN_KEY"
        }

        passport.use(
            new JwtStrategy(option, async(payload, done) => {

                const findingUser = await this.service.prisma.user.findUnique({where: {email: payload.email}})
                if(!findingUser) return done(null, false)

                return done(null, findingUser)
            })
        )
    }
}

export default PassportAuthentification