import Services from "@/services";
import {Response} from "express";
import {CustomError} from "@/global";

class Controllers {
    public services: Services = new Services()

    public success(res: Response, code: number = 200, data: unknown): Response {
        return res.status(code).json({success: true, data})
    }

    public error(res: Response, code: number | string = 500, message: string): Response {
        if(typeof code !== "number") {
            return res.status(500).json({success: false, message})
        }
        return res.status(code || 500).json({success: false, message})
    }

    public customError(message: string, code: number =  500): CustomError {
        return { message, code }
    }
}

export default Controllers