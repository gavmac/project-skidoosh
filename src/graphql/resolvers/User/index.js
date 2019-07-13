// import User from "../../../server/models/User";

const User = [
    { id: 1, name: "John Doe", email: "test@gmail.com", age: 21 },
    { id: 2, name: "Jane Doe" , email: "test@gmail.com", age: 22 }
];

export default {
    Query: {
        user: async ({ _id }) => {
            return await User.findOne({ _id }).exec();
        },
        users: async () => {
            const users = await User.find({}).toArray();
                // .exec();

            return users.map(u => ({
                _id: u._id.toString(),
                name: u.name,
                email: u.email,
                age: u.age,
            }));
        }
    },
    Mutation: {
        createUser: async (parent, { user }, context, info) => {
            const newUser = await new User({
                name: user.name,
                email: user.email,
                age: user.age
            });

            return new Promise((resolve, reject) => {
                newUser.save((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        },
        updateUser: async (parent, { _id, user }, context, info) => {
            return new Promise((resolve, reject) => {
                User.findByIdAndUpdate(_id, { $set: { ...user } }, { new: true }).exec(
                    (err, res) => {
                        err ? reject(err) : resolve(res);
                    }
                );
            });
        },
        deleteUser: async (parent, { _id }, context, info) => {
            return new Promise((resolve, reject) => {
                User.findByIdAndDelete(_id).exec((err, res) => {
                    err ? reject(err) : resolve(res);
                });
            });
        }
    },
};
