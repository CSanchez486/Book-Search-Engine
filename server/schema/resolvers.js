// resolvers.js`: Define the query and mutation functionality to work with the Mongoose models.
		// **Hint**: Use the functionality in the `user-controller.js` as a guide.

// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express");

//  Define the query
const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            if(context.user) {
                const userDb = await User.findOne({_id: context.user._id}).select(
                    // hides password
                     "-__v -password"
                );
                return userDb;
            }
            throw new AuthenticationError("Not logged in");
        },
    },
    // Define the mutation functionality
    Mutation: {
        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Incorrect Credentials");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect Credentials");
            }
        }
    }

},




