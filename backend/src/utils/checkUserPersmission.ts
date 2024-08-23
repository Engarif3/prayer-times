export const checkUserPermission = async (
  prisma: any,
  userId: any,
  prayerId: any
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      authError: "user not found",
      prayer: null,
    };
  }

  const prayer = await prisma.prayer.findUnique({
    where: {
      id: Number(prayerId),
    },
  });

  if (!prayer) {
    return {
      authError: "prayer not found",
      prayer: null,
    };
  }

  // this is not that much required for this project (this will not let other to update the prayer info without that specific user who created that)
  if (prayer.authorId !== user.id) {
    return {
      authError: "This prayer is not created by you",
      prayer: null,
    };
  }
};
