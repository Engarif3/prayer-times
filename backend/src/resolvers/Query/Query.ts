import { Prisma } from "@prisma/client";

export const Query = {
  users: async (parent: any, args: Prisma.UserCreateInput, { prisma }: any) => {
    // const users = await prisma.user.findMany();
    return await prisma.user.findMany();
    // console.log(users);
  },
};
