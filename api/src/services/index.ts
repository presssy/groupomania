import { PrismaClient } from "@prisma/client";
import MiscService from "./misc";

class Services {
  public prisma: PrismaClient = new PrismaClient();
  public misc: MiscService = new MiscService();

  constructor() {}
}

export default Services;
