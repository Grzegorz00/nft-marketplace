const { users } =  require('./database.js');

const resolvers = {

    User: {
        id: (parent, args, context, info) => parent.id,
        name: (parent) => parent.name,
        address: (parent) => parent.address,
      },

    Query: {
      user: (parent, args) => {
        return users.find((user) => user.id === Number(args.id))
      },
      users: (parent,args) => {
        return users
      }
    },

    Mutation: {
      registerUser: (parent, args) => {
        users.push({
          id: users.length + 1,
          address: args.address,
          name: args.name,
        })
        return users[users.length - 1]
      },
    
    },

  }

  module.exports = {
    resolvers,
  }