const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cardSchema = new mongoose.Schema({ // new Schema
    //providing attributes that user can have

   Currency: {
        type : String,
        required: true
    },

    CVC: {
        type : String,
        required: true
    },

    
   
},

    
    
);

const Card = mongoose.model("Payment_Card",cardSchema);//varahan athule denne table name eka

module.exports = Card;