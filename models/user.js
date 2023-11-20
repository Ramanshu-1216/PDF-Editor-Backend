const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    pdfs: {
        type: Array
    },
});
UserSchema.pre('save', async function(next){
    try {
        if (this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    }
    catch (error) {
        console.log("Error in pre save in UserSchema: " + error);
        next(error);
    }
});
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ userID: this._id, email: this.email }, '0000');
    return token;
}
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;