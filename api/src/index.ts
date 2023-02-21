import express, {Application, Request, Response} from "express"
import session from "express-session"
import passport from "passport"
import cors from "cors"
import * as dotenv from "dotenv"
import usersRoutes from "@/routes/users"

dotenv.config()

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.config()
        this.initRoutes()

        this.app.listen(process.env.API_PORT || 4040, () => {
            console.log(`🚀 Server is launching...`);
            console.log(
                `Server is ready on ${process.env.API_ENV || "http://localhost"}:${process.env.API_PORT || 4040}`
            );
        })
    }

    private config(): void {
        this.app.use(cors({
            origin: process.env.ORIGIN_HOST || "http://localhost:5173",
            credentials: true
        }))
        this.app.use(express.json())

        this.app.use(session({
            secret: process.env.SESSION_KEY || "secretKey",
            resave: false,
            saveUninitialized: false
        }))

        this.app.use(passport.initialize())
        this.app.use(passport.session())
    }

    private initRoutes(): void {
        this.app.get('/', (req: Request, res: Response) => res.send('Routes not found'))
        this.app.use('/users', usersRoutes)
    }
}

export default new App().app