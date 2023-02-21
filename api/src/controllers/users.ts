import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Controllers from "@/controllers/index";

class UsersController extends Controllers {
  constructor() {
    super();

    this.signInUser = this.signInUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getOneUser = this.getOneUser.bind(this);
  }

  public async signInUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const findingUser = await this.services.prisma.user.findUnique({
        where: { email },
      });
      if (!findingUser) {
        throw this.customError("User not found", 404);
      }

      const passwordIsCorrect = await bcrypt.compare(
        password,
        findingUser.password
      );
      if (!passwordIsCorrect) {
        throw this.customError("Password is incorrect", 401);
      }

      const token = jwt.sign(
        {
          userId: findingUser.id,
          email,
        },
        process.env.TOKEN_KEY || "token",
        { expiresIn: "24h" }
      );

      return this.success(res, 200, token);
    } catch (err: any) {
      return this.error(res, err.code, err.message);
    }
  }

  public async registerUser(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const userAlreadyExist = await this.services.prisma.user.findUnique({
        where: { email },
      });
      if (userAlreadyExist) {
        throw this.customError("User already registered", 401);
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const registeringUser = await this.services.prisma.user.create({
        data: {
          email,
          password: hashPassword,
        },
      });

      return this.success(res, 201, registeringUser);
    } catch (err: any) {
      return this.error(res, err.code, err.message);
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.services.prisma.user.findMany();

      await this.services.misc.clearDataArray(users, ["password"]);

      return this.success(res, 200, users);
    } catch (err: any) {
      return this.error(res, err.code, err.message);
    }
  }

  public async getOneUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const user = await this.services.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw this.customError("User not found", 404);
      }

      await this.services.misc.clearData(user, ["password"]);

      return this.success(res, 200, user);
    } catch (err: any) {
      return this.error(res, err.code, err.message);
    }
  }
}

export default new UsersController();
