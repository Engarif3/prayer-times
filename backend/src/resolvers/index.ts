import { PrismaClient, Prisma } from "@prisma/client";
import { Query } from "./Query/Query";
import { Mutation } from "./Mutation/Mutation";
const prisma = new PrismaClient();

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}
export const resolvers = {
  Query,
  Mutation,
};
