require('dotenv').config();

const mongoose = require("mongoose");
const { number } = require("zod");

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
})

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const Account = mongoose.model('Account', accountSchema)
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account
};