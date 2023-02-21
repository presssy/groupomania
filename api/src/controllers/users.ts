import Controllers from "@/controllers/index";
import {Request, Response} from "express";
import bcrypt from "bcrypt"

class UsersController extends Controllers{

    constructor() {
        super()

        this.registerUser = this.registerUser.bind(this)
    }

    public async registerUser(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body
        try {
            const userAlreadyExist = await this.services.prisma.user.findUnique({where: {email}})
            if(userAlreadyExist) throw this.customError("User already registered", 401)

            const hashPassword = await bcrypt.hash(password, 10)

            const registeringUser = await this.services.prisma.user.create({
                data: {
                    email,
                    password: hashPassword
                }
            })

            return this.success(res, 201, registeringUser)
        }
        catch(err: any) {
            return this.error(res, err.code, err.message)
        }
    }

}

export default new UsersController()