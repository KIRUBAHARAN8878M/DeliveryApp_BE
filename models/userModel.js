const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is Required']
    },
    email : {
        type : String,
        lowercase : true,
        unique : true,
        required : [true, 'Email is Required'],
    },
    password : {
        type : String,
        required : [true, 'Password is Required']
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
},{timeStamps:true}
);

module.exports = mongoose.model('User', userSchema);