const mongoose = require('mongoose')

const burgerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    varients:[],
    prices:[],
    category:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }

},
{timestamps:true});

const burgerModel = mongoose.model('burgers',burgerSchema);

module.exports = burgerModel;
