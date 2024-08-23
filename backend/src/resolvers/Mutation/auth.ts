import bcrypt from "bcrypt";
import { jwtToken } from "../../utils/jwtToken";
import config from "../../config";

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}
export const authenticatorFunc = {
  signUp: async (parent: any, args: userInfo, { prisma }: any) => {
    const isExists = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (isExists) {
      return {
        authError: "this email already registered",
        token: null,
      };
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtToken.generateToken(
      { userId: newUser.id },
      config.jwt.secret as string
    );
    return {
      authError: null,
      token,
    };
  },

  signIn: async (parent: any, args: any, { prisma }: any) => {
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

    const token = await jwtToken.generateToken(
      { userId: user.id },
      config.jwt.secret as string
    );
    return {
      authError: null,
      token,
    };
  },
};
