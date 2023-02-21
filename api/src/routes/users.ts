import Routes from "@/routes/index";
import UsersControllers from "@/controllers/users"

class UsersRoutes extends Routes {

    private usersControllers = UsersControllers

    constructor() {
        super();
        this.usersRoutes()
    }

    private usersRoutes(): void {
        this.router.post('/register', this.usersControllers.registerUser)
    }
}

export default new UsersRoutes().router