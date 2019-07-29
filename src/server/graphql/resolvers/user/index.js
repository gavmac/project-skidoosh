import User from "../../../models/User";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';


const getUserId = context => {

    const authorization = context.headers.authorization || ''
    if (authorization) {
        const token = authorization.split(' ')[1]
        const user_id = jwt.verify(token, process.env.TOKEN_SECRET);
        return user_id
    }

    throw new AuthenticationError('you must be logged in');
}



export default {
    Query: {
        getUsers: async () => {
            const users = await User.find({}).exec();
            return users.map(user => user.toObject());
        },
        currentUser: async (root, args, context) => {
            const user = context.user_id ? await User.findById(context.user_id) : null;
            return user
        }
    },
    Mutation: {
        addUser: async (_, args, context) => {
            try {
                return await User.create(args);
            } catch (e) {
                return e.message;
            }
        },
        login: async (root, { email, password }) => {
            const existingUser = await User.findOne({email});
            const validPassword = await bcrypt.compare(password, existingUser.password);

            if (!existingUser) {
                throw new Error('User not found')
            }
            if (!validPassword) {
                throw new Error('Password not found')
            }

            existingUser.jwt = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);

            return existingUser;
        },
        signup: async (root, { name, email, password }) => {
            const existingUser = await User.findOne({email});
            if (existingUser) {
                throw new Error('Email already used');
            }

            const hash = await bcrypt.hash(password, 10);
            const user = await User.create({ name: name, email: email, password: hash });
            user.jwt = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

            return user


        }

    }
};
