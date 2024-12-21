const mongoose = require('mongoose');
const Constants = require('./utils/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true,
    },
    email : {
        type: String,
        required: [true, 'Please provide an email'],
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
        unique: true,
        trim: true
    },
    password : {
        type: String,
        required: [true, 'Please provide a password'],
        select: false,
        trim: true
    },

    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    deletedAt : {
        type: Date,
        default: null
    },

    isDeleted : {
        type: Boolean,
        default: false
    }
    
});


//Password Hashing
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next(); // Only hash if the password is modified
    }
    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
    this.password = await bcrypt.hash(this.password, salt) // Hash the password
})

//Sign JWT Token and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id, role: this.role}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Compare login password and hashed password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model(Constants.USER, UserSchema)