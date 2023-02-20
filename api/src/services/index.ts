import { PrismaClient } from "@prisma/client";

class Services {
    public prisma: PrismaClient = new PrismaClient()
}

export default Services