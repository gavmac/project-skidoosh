const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    img: { data: Buffer, contentType: String }
});

export default mongoose.model('User', userSchema);


