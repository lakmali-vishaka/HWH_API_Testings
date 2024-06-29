const router = require("express").Router();
const Card = require("../models/Card");
const jwt = require('jsonwebtoken');
const session = require('express-session');



const generateToken = (cardId) => {
    // Use your secret key to sign the token
    const token = jwt.sign({ id: cardId }, 'your_secret_key', { expiresIn: '1h' }); // Adjust expiry time as needed
    return token;
};


router.use(session({
    secret: 'your_secret_key', // Secret key for session encryption
    resave: false,
    saveUninitialized: false
}));



//add user (signup)
router.route("/add_card").post((req, res) => {
    // Add user logic
    const Card_Number = req.body.Card_Number;
    const Expire_Date = req.body.Expire_Date;
    const CVC = req.body.CVC;
    

    const newCard = new Card({
        Card_Number ,
        Expire_Date,
        CVC,
        
    })

    newCard.save().then(()=>{
        res.json("card added")
    }).catch((err)=>{
        console.log(err);
    })
})


//dispaly the card details
router.route("/card-data").get(async (req, res) => {
    const cardData = req.session.cardData;
  
    // Check if card data exists in the session
    if (cardData) {
      res.json(cardData); // Send card data as response
    } else {
      res.status(404).json({ error: 'Card data not found in session' });
    }
});


module.exports = router;
