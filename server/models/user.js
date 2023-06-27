const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, index: true, unique: true },
    password: String,
    role: String,
    name: String,
    age: Number,
    birthdate: Date,
    address: String,
    remark: String,
}, { versionKey: false });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;