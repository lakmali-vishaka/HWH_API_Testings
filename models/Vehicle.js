const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    Vehicle_number: {
        type: String,
        required: true
    },
    
    Type: {
        type: String,
        required: true
    },

    //selectedGate: {
        //type: String // Assuming selectedGate will store the gate name
   // },

    Entrance: {
        type:String
    },

    Exit:{
        type:String
    },

    //Exit_gate: {
        //type:String

   // }
    
}, 

{
    timestamps: true
});

const Vehicle = mongoose.model("Vehicle_Registration", vehicleSchema);
Vehicle.collection.dropIndex({ createdAt: 1 }, (err, result) => {
    if (err) {
        console.error("Error dropping TTL index:", err);
    } else {
        console.log("TTL index dropped successfully:", result);
    }
});

module.exports = Vehicle;