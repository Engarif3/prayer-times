export const User = {
  // users [Prayer] in schema, should be prayers [Prayer] in schema
  users: async (parent: any, args: any, { prisma, userInfo }: any) => {
    const isMyProfile = parent.id === userInfo.userId;
    if (isMyProfile) {
      return await prisma.prayer.findMany({
        where: {
          authorId: parent.id,
        },
      });
    } else {
      return await prisma.prayer.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
      });
    }
  },
};
