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
          where: { id: Number(args.id) },
        });
      },
      users: (parent,args) => {
        return prisma.user.findMany()
      }
    },

    Mutation: {
      registerUser: (parent, args) => {
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