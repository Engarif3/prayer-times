export const typeDefs = `#graphql

  type Query {
  userName: User
  users: [User]
  prayers:[Prayer]

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

    addPrayer(prayer: PrayerInput!): PostPayload
    updatePrayer(prayerId: ID!,prayer:PrayerInput): PostPayload
    deletePrayer(prayerId: ID!):PostPayload
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

    type PostPayload{
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
