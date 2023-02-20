import Controllers from "@/controllers/index";
import {Request, Response} from "express";

class UsersController extends Controllers{

    constructor() {
        super()
    }

    public async registerUser(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body
        try {
            const userAlreadyExist = await this.services.prisma.user.findUnique({where: {email}})
            if(userAlreadyExist) throw this.customError("User already registered", 401)

            return this.success(res, 201, userAlreadyExist)
        }
        catch(err: any) {
            return this.error(res, err.code, err.message)
        }
    }

}

export default new UsersController()