const mongoose = require('mongoose');
require('colors')
require("dotenv").config();

const connectDB = async ()=> {
    try {
        const url = process.env.MONGO_URL;
        const conn = await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`Mongodb Database connected ${conn.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log(`error : ${error.message}`.bgRed.white);
        }
};

module.exports = connectDB;

