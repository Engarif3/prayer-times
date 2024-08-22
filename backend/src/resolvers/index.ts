import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// interface userInfo {
//   name: String;
//   email: String;
//   password: String;
// }
export const resolvers = {
  Query: {
    users: async (parent: any, args: Prisma.UserCreateInput, context: any) => {
      // const users = await prisma.user.findMany();
      return await prisma.user.findMany();
      // console.log(users);
    },
  },
  Mutation: {
    signup: async (parent: any, args: Prisma.UserCreateInput, context: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);

      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, "signature", {
        expiresIn: "1d",
      });
      return {
        token,
      };
    },
  },
};
