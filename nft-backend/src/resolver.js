const { prisma } =  require('./database.js');

const resolvers = {

    User: {
        address: (parent) => parent.address,
        name: (parent) => parent.name,
        backgroundUrl: (parent) => parent.backgroundUrl,
        avatarUrl: (parent) => parent.avatarUrl,
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
      createUser: (parent, args) => {
        return prisma.user.create({
          data: {
            address: args.address,
            name: args.name,
            backgroundUrl: args.backgroundUrl,
            avatarUrl: args.avatarUrl
          }
        });
      },
      updateName: (parent, args) => {
        return prisma.user.update({
          where: { address: args.address },
          data: {
            name: args.name,
          }
        });
      },
      updateImage: (parent, args) => {
        return prisma.user.update({
          where: { address: args.address },
          data: {
            backgroundUrl: args.backgroundUrl,
            avatarUrl: args.avatarUrl
          }
        });
      }
    },

  }

  module.exports = {
    resolvers,
  }