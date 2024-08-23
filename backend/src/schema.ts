export const typeDefs = `#graphql

  type Query {
  userName: User
  users: [User]
  prayers:[Prayer]
  profile(userId: ID!): Profile

  }

  type Mutation {
    signUp(name: String!,
      email: String!,
      password: String!
      bio: String
      ): AuthPayload,

    signIn(
      email: String!
      password: String!
    ): AuthPayload,

    addPrayer(prayer: PrayerInput!): PrayerPayload
    updatePrayer(prayerId: ID!,prayer:PrayerInput): PrayerPayload
    deletePrayer(prayerId: ID!):PrayerPayload
    publishPrayer(prayerId: ID!): PrayerPayload
  }

  type Prayer {
    id: ID!
    title: String!
    prayerTime: String!
    author: User
    createdAt: String!
    published: Boolean!

  }

  type User{
  id: ID!
  name: String!
  email: String!
  createdAt: String!
  users: [Prayer]
  }

  type Profile {
    id: ID!
    bio: String!
    createdAt: String!
    user: User!
  }

    type PrayerPayload{
    authError: String
    prayer: Prayer

  }

  type AuthPayload {
    authError: String,
    token: String
  }

  input PrayerInput {
  title: String
  prayerTime: String
  }
`;
