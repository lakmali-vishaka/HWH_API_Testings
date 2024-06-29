const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
app.use(express.json());


//defining the port
const PORT = process.env.PORT || 8070;


//use the dependencies that we are use
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

//connect to mongodb
mongoose.connect(URL,{
    useNewUrlParser: true,
});

//open connection that we are created

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb Connection success!");
})



// Operator database connection
const operatorDB_URL = process.env.OPERATOR_MONGODB_URL;
const operatorDB = mongoose.createConnection(operatorDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
operatorDB.on('connected', () => {
    console.log("Connected to operator database successfully!");
});
operatorDB.on('error', (err) => {
    console.error("Error connecting to operator database:", err);
});


// Vehicle database connection
const vehicleDB_URL = process.env.VEHICLE_MONGODB_URL; // Assuming you have a separate URL for the vehicle database
const vehicleDB = mongoose.createConnection(vehicleDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
vehicleDB.on('connected', () => {
    console.log("Connected to vehicle database successfully!");
});
vehicleDB.on('error', (err) => {
    console.error("Error connecting to vehicle database:", err);
});


//Ticketdatabase connection
const ticketDB_URL = process.env.TICKET_MONGODB_URL; // Assuming you have a separate URL for the vehicle database
const ticketDB = mongoose.createConnection(ticketDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
ticketDB.on('connected', () => {
    console.log("Connected to Ticket database successfully!");
});
ticketDB.on('error', (err) => {
    console.error("Error connecting to vehicle database:", err);
});


//paymentcard databaseconnection
const cardDB_URL = process.env.CARD_MONGODB_URL; // Assuming you have a separate URL for the vehicle database
const cardDB = mongoose.createConnection(cardDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
ticketDB.on('connected', () => {
    console.log("Connected to payment database successfully!");
});
ticketDB.on('error', (err) => {
    console.error("Error connecting to payment database:", err);
});




//const userRouter = require("./models/User.js");


const userRouter = require("./routes/users.js");
const operatorRouter = require("./routes/Operators.js");
const vehicleRouter = require("./routes/vehicles.js");
const ticketRouter = require("./routes/tickets.js");
const cardRouter = require("./routes/cards.js");








app.use("/user",userRouter);
app.use("/operator", operatorRouter);
app.use("/vehicle",vehicleRouter);
app.use("/ticket",ticketRouter);
app.use("/card",cardRouter);



//listen to port
app.listen(PORT,() =>{
    console.log(`server is up and running on port:${PORT}`)

})


