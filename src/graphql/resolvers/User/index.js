import User from "../../../server/models/User";

const resolvers = {
    Query: {
         getUsers: async () => { await User.find({}).exec()}
    },
    Mutation: {
        addUser: async (_, args) => {
            try {
                let response = await User.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        }
    }
};

export default resolvers;

// export default {
//     Query: {
//         hello: async () => { return await 'Hello World!' },
//         feed: async () => { return await links },
//         info: async () => { return await `This is the API of a Hackernews Clone`},
//         user: async ({ _id }) => {
//             return await people.findOne({ _id }).exec();
//         },
//         // users: async() => { return await people },
//         users: async () => {
//             const users = await people.find({}).toArray();
//             // .exec();
//
//             return users.map(u => ({
//                 _id: u._id.toString(),
//                 name: u.name,
//                 email: u.email,
//                 age: u.age,
//             }));
//         }
//     },
//
//     Mutation: {
//         createUser: async (parent, { user }, context, info) => {
//             const newUser = await new User({
//                 name: user.name,
//                 email: user.email,
//                 age: user.age
//             });
//
//             return new Promise((resolve, reject) => {
//                 newUser.save((err, res) => {
//                     err ? reject(err) : resolve(res);
//                 });
//             });
//         },
//         updateUser: async (parent, { _id, user }, context, info) => {
//             return new Promise((resolve, reject) => {
//                 User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
//                     (err, res) => {
//                         err ? reject(err) : resolve(res);
//                     }
//                 );
//             });
//         },
//         deleteUser: async (parent, { _id }, context, info) => {
//             return new Promise((resolve, reject) => {
//                 User.findByIdAndDelete(_id).exec((err, res) => {
//                     err ? reject(err) : resolve(res);
//                 });
//             });
//         }
//     },
// };
