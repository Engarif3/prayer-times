import { userLoader } from "../dataLoaders/userLoaders";

export const Prayer = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    return userLoader.load(parent.authorId);
  },
};
