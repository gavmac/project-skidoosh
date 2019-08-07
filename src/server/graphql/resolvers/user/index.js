import User from "../../../models/User";
import { createWriteStream } from 'fs';
import * as mkdirp from 'mkdirp';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

const uploadDir = './uploads';
const db = new lowdb(new FileSync('db.json'));

// Seed an empty DB
db.defaults({ uploads: [] }).write()

// Ensure upload directory exists
mkdirp.sync(uploadDir)

const storeUpload = async ({ stream, filename }) => {
    const path = `${uploadDir}/image.jpg`;

    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(path))
            .on('finish', () => resolve({ path }))
            .on('error', reject),
    )
};

const dbSize = () => {
    return (
    db.get('uploads')
        .size()
        .value()
    )
}


const recordFile = file => {

    if (dbSize() === 1) {
        db.get('uploads')
            .find({path: "./uploads/image.jpg"})
            .assign(file)
            .write();
    } else {
        db.get('uploads')
            .push(file)
            .last()
            .write();
    }
};

const processUpload = async upload => {
    const { stream, filename, mimetype, encoding } = await upload;
    const { id, path } = await storeUpload({ stream, filename });
    return recordFile({ id, filename, mimetype, encoding, path });
};


const getUserId = context => {
    const authorization = context.req.headers.authorization || ''
    if (authorization) {
        const token = authorization.split(' ')[1]
        const user_id = jwt.verify(token, process.env.TOKEN_SECRET);
        return user_id
    }

    throw new AuthenticationError('you must be logged in');
};



export default {
    Query: {
        getUpload: () => db.get('uploads').value(),

        getUsers: async () => {
            const users = await User.find({}).exec();
            return users.map(user => user.toObject());
        },
        currentUser: async (root, args, context) => {
            const user_id = getUserId(context)
            const user = user_id ? await User.findById(user_id) : null;
            return user
        }
    },
    Mutation: {
        uploadFile: (obj, { file }) => processUpload(file),

        // uploadFile: async (root, { file }) => {
        //     const { stream, filename, mimetype, encoding } = await file;
        //     const bucket = await mongoUpload();
        //     const uploadStream = bucket.openUploadStream('test');
        //     await new Promise((resolve, reject) => {
        //         stream
        //             .pipe(uploadStream)
        //             .on("error", reject)
        //             .on("finish", resolve);
        //     });
        //     return { _id: uploadStream.id, filename, mimetype, encoding }
        // },

        addUser: async (_, args, context) => {
            try {
                return await User.create(args);
            } catch (e) {
                return e.message;
            }
        },
        login: async (root, { email, password }) => {
            const existingUser = await User.findOne({email});

            if (!existingUser) {
                throw new Error('User not found')
            }
            const validPassword = await bcrypt.compare(password, existingUser.password);

            if (!validPassword) {
                throw new Error('Password not found')
            }

            existingUser.jwt = jwt.sign({ _id: existingUser._id }, process.env.TOKEN_SECRET);
            return existingUser
        },
        signup: async (root, { name, email, password }) => {
            const existingUser = await User.findOne({email});
            if (existingUser) {
                throw new Error('Email already in use');
            }

            const hash = await bcrypt.hash(password, 10);
            const user = await User.create({ name: name, email: email, password: hash });
            user.jwt = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            return user
        }

    }
};
