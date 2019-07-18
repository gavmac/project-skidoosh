const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: String,
    email: String
});

export default mongoose.model('User', userSchema);


