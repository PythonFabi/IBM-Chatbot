const { AuthenticationError } = require('apollo-server-express');
const { User, Chat } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    // create queries for finding chats
    Query: {
        chats: async () => {
            return await Chat.find();
        },
    },
    Mutation: {
        // add user mutation including a new token for the user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // create a new chat 
        createChat: async (parent, { Chat }, context) => {
            if(context.user) {
                const chat = new Chat({ message });

                await User.findByIdAndUpdate(context.user._id, args, {
                    $push: { chats: chat.message },
                });

                return chat;
            }

            throw new AuthenticationError('Not logged in');
        },
        // update user mutation
        updatedUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, {
                    new: true,
                });
            }

            throw new AuthenticationError('Not logged in');
        },
        // update chat mutation
        updateChat: async (parent, { _id, message }) => {
            if (context.chat) {
                return await Chat.findByIdAndUpdate(context.user._id, args, {
                    new: true,
                });
            }
        },
        // login mutation
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },  
    },
};

module.exports = resolvers;