const mongoose = require('mongoose')
const dotenv = require('dotenv')
require('colors')
const connectDb = require('./config/config')
const Burger = require('./models/burgerModel')
const Burgers = require('./data/burgerdata')

//config dot env and mongodb conn file
dotenv.config();
connectDb();


//import data
const importData = async() => {
    try {
        await Burger.deleteMany()
        const sampleData = Burgers.map((burger) => {return {...burger}});
        await Burger.insertMany(sampleData);
        console.log('Data Imported'.bgGreen.white);
        process.exit();
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        process.exit(1);
    }
};

const dataDestory = () => {};

if(process.argv[2] === '-d'){
    dataDestory();
}else{
    importData();
}
