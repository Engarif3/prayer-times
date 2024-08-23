import { authenticatorFunc } from "./auth";
import { prayerResolvers } from "./prayer";

export const Mutation = {
  ...authenticatorFunc,
  ...prayerResolvers,
};
