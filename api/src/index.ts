import express, {Application} from "express"
import cors from "cors"
import * as dotenv from "dotenv"

dotenv.config()

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.config()

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
    }
}

export default new App().app