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
      ): AuthPayload,

    signIn(
      email: String!
      password: String!
    ): AuthPayload,
  }

  type AuthPayload {
    authError: String,
    token: String
  }

  type Prayer {
    id: ID!
    title: String!
    prayerTime: String!
    timeLeftForPrayer: String!
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
`;
