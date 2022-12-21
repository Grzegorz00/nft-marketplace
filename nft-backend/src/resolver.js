const { prisma } =  require('./database.js');

const resolvers = {

    User: {
        id: (parent, args, context, info) => parent.id,
        name: (parent) => parent.name,
        address: (parent) => parent.address,
      },

    Query: {
      user: (parent, args) => {
        return prisma.user.findFirst({
          where: { address: args.address },
        });
      },
      users: (parent,args) => {
        return prisma.user.findMany()
      }
    },

    Mutation: {
      addUser: (parent, args) => {
        return prisma.user.create({
          data: {
            address: args.address,
            name: args.name,
          },
        });
      },
    },

  }

  module.exports = {
    resolvers,
  }