import Routes from "@/routes/index";
import UsersControllers from "@/controllers/users";

class UsersRoutes extends Routes {
  private usersControllers = UsersControllers;

  constructor() {
    super();
    this.usersRoutes();
  }

  private usersRoutes(): void {
    this.router.post("/signin", this.usersControllers.signInUser);
    this.router.post("/register", this.usersControllers.registerUser);
    this.router.get("/all", this.usersControllers.getAllUsers);
    this.router.get("/:id", this.usersControllers.getOneUser);
  }
}

export default new UsersRoutes().router;
