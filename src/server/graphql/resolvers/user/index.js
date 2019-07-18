import User from "../../../models/User";

export default {
    Query: {
        getUsers: async () => { let response = await User.find({}).exec();
        return response;}
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
