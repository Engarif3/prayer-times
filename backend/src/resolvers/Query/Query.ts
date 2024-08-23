import { Prisma } from "@prisma/client";

export const Query = {
  //my info
  userName: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },

  profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(args.userId),
      },
    });
  },

  users: async (parent: any, args: Prisma.UserCreateInput, { prisma }: any) => {
    // const users = await prisma.user.findMany();
    return await prisma.user.findMany();
    // console.log(users);
  },
  prayers: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.prayer.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
