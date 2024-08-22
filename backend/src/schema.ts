export const typeDefs = `#graphql

  type Query {
  userName: User
  prayers:[Prayer]

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
