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
    signUp: async (parent: any, args: Prisma.UserCreateInput, context: any) => {
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
        authError: null,
        token,
      };
    },

    signIn: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        return {
          authError: "user not found",
          token: null,
        };
      }
      const correctPass = await bcrypt.compare(args.password, user?.password);
      if (!correctPass) {
        return {
          authError: "password does not match",
          token: null,
        };
      }

      const token = jwt.sign({ userId: user.id }, "signature", {
        expiresIn: "1d",
      });
      return {
        authError: null,
        token,
      };
    },
  },
};
