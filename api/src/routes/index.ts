import {Request, Response, Router} from "express";

class Routes {
    public router: Router

    constructor() {
        this.init()
    }

    private init(): void {
        /**
         * common routes
         */

        this.router.get('/', (req: Request, res: Response) => res.send('Route not found'))
    }
}

export default Routes