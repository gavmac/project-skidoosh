import Server from "../graphql";
import mongoose from "mongoose";

const express = require('express');
const db = "mongodb://gavmac:282820g@ds147746.mlab.com:47746/jeerio";

// Connect to MongoDB with Mongoose.
mongoose
    .connect(
        db,
        {
            useCreateIndex: true,
            useNewUrlParser: true
        }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


const app = express();
Server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${Server.graphqlPath}`)
);
