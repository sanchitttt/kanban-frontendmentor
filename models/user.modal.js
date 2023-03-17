const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error(
                    "Password must contain at least one letter and a number"
                )
            }

        },
        required: true,
        trim: true,
        minLength: 8
    }
})


const User = mongoose.model("users", UserSchema);



module.exports = User;