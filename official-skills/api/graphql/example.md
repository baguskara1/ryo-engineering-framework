# Examples

## Example 1: GraphQL Schema

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users: [User!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
}
```

## Example 2: Apollo Resolver with DataLoader

```typescript
const resolvers = {
  Query: {
    users: async (_parent: any, _args: any, { db }: Context) => {
      return db.users.findAll();
    },
  },
  User: {
    posts: async (user: User, _args: any, { loaders }: Context) => {
      return loaders.postsByUser.load(user.id);
    },
  },
};
```
