const router = require("express").Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    // Use your secret key to sign the token
    const token = jwt.sign({ id: userId }, 'your_secret_key', { expiresIn: '1h' }); // Adjust expiry time as needed
    return token;
};


//add user (signup)
router.route("/add").post((req, res) => {
    // Add user logic
    const NIC = req.body.NIC;
    const Mobile = req.body.Mobile;
    const email = req.body.email;
    const password = req.body.password; 

    const newUser = new User({
        NIC,
        Mobile,
        email,
        password,
    })

    newUser.save().then(()=>{
        res.json("user added")
    }).catch((err)=>{
        console.log(err);
    })
})

/*//featch all the user data from database
router.route("/").get((req, res) => {
    // Find all users logic
    User.find().then((User)=>{
        res.json(User)
    }).catch((err)=>{
        console.log(err)
    })
});

/*
//update user by providing user ID as a parameter
router.route("/update/:userId").put(async (req, res) => {
    try {
        const userId = req.params.userId;
        const { NIC, Mobile, email,password } = req.body;
        const updateUser = { NIC, Mobile, email,password };
        const updatedUser = await User.findByIdAndUpdate(userId, updateUser);
        res.status(200).json({ status: "User updated", user: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating user", error: err.message });
    }
});

//delete user

router.route("/delete/:id").delete(async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error deleting user", error: err.message });
    }
});*/

router.route("/get/:id").get(async (req, res) => {
    try {
        const userId = req.params.id; 
        const user = await User.findById(userId);
        res.status(200).json({ status: "User fetched", user: user });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error fetching user", error: err.message });
    }
});


//login
router.route("/login").post(async (req, res) => {
    const { NIC, password } = req.body;
    
    User.findOne({ NIC: NIC, password: password })
        .then(user => {
            if (user) {
                // Check if the passwords match
                if (user.password === password) {
                    res.json({
                        _id: user._id,
                        NIC: user.NIC,
                        Mobile: user.Mobile,
                        email: user.email,
                        password: user.password,
                        token: generateToken(user._id),
                      
                    });
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record found for the given NIC");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).json({ error: "An internal server error occurred" });
        });
});




//update profile

router.route('/update').post(async (req, res) => {
    try {
        const userId = req.body.userId; // Corrected to use req.body.userId

        const user = await User.findById(userId);
        if (user) {
            user.NIC = req.body.NIC || user.NIC;
            user.Mobile = req.body.Mobile || user.Mobile;
           
            if (req.body.password) {
                user.password = req.body.password;
            }
            const updateUser = await user.save();
            res.json({
                _id: updateUser._id,
                NIC: updateUser.NIC,
                Mobile: updateUser.Mobile,
                password: updateUser.password,
                token: generateToken(updateUser._id),
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});

//featch profile information

router.route("/profile").post(async (req, res) => {
    const { NIC, password } = req.body; // Retrieve NIC and password from request body
    
    try {
        // Find user based on NIC and password
        const user = await User.findOne({ NIC, password });
        
        if (user) {
            // If user is found, send user information in the response
            res.json({
               // id: user._id,
                NIC: user.NIC,
                Mobile: user.Mobile,
                Email:user.email
                
            });
        } else {
            // If user is not found, send 404 error
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        // Handle internal server error
        console.error("Error:", error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
});






module.exports = router;
