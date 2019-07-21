import User from "../../../models/User";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../../../../utils/auth';


const createToken = async (user, secret) => {
    const { id, email, username } = user;
    return await jwt.sign({ id, email, username }, secret);
};

export default {
    Query: {
        getUsers: async () => {
            const users = await User.find({}).exec();
            return users.map(user => user.toObject());
        }
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await User.create(args);
                debugger;
                return response;
            } catch (e) {
                return e.message;
            }
        },

        signUp: async (parent, args, context, info) => {
            const password = await bcrypt.hash(args.password, 10);
            const user = await User.create({
                name: args.name,
                email: args.email,
                password: password,
            });
            return {token: createToken(user, APP_SECRET)};

        },

        logIn: async (parent, args, context, info) => {
            const user = await User.findOne({email: args.email});
            if (!user) {
                throw new Error('No such user found')
            }
            const valid = await bcrypt.compare(args.password, user.password)
            if (!valid) {
                throw new Error('Invalid password')
            }
        }
    }
};
