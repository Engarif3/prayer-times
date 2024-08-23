import { checkUserPermission } from "../../utils/checkUserPersmission";

export const prayerResolvers = {
  addPrayer: async (
    parent: any,
    { prayer }: any,
    { prisma, userInfo }: any
  ) => {
    if (!userInfo) {
      return {
        authError: "unauthorized access",
        prayer: null,
      };
    }

    if (!prayer.title || !prayer.prayerTime) {
      return {
        authError: "Prayer title and prayer time are required",
        prayer: null,
      };
    }

    const createPrayer = await prisma.prayer.create({
      data: {
        title: prayer.title,
        prayerTime: prayer.prayerTime,
        authorId: userInfo.userId,
      },
    });
    return {
      authError: null,
      prayer: createPrayer,
    };
  },
  updatePrayer: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        authError: "unauthorized access",
        prayer: null,
      };
    }

    const error = await checkUserPermission(
      prisma,
      userInfo.userId,
      args.prayerId
    );

    if (error) {
      return error;
    }

    const updatedPrayer = await prisma.prayer.update({
      where: {
        id: Number(args.prayerId),
      },
      data: args.prayer,
    });

    return {
      authError: null,
      prayer: updatedPrayer,
    };
  },

  deletePrayer: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        authError: "unauthorized access",
        prayer: null,
      };
    }

    const error = await checkUserPermission(
      prisma,
      userInfo.userId,
      args.prayerId
    );

    if (error) {
      return error;
    }

    const deletedPrayer = await prisma.prayer.delete({
      where: {
        id: Number(args.prayerId),
      },
    });

    return {
      authError: null,
      prayer: deletedPrayer,
    };
  },
};
