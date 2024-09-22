const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/UserDetails");
const fetchUser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');
const secretCode = "parveenisa@good$boy";

//  ROUTE 1:Saving user data in database using /createuser endpoint. 
router.post('/createuser', [
    // Data validation using express validator
    body('name', 'Please enter a valid name!').isLength({ min: 3 }),
    body('email', 'Please enter a valid email!').isEmail(),
    body('password', 'Password contains atleast 5 characters!').isLength({ min: 5 })
], async (req, res) => {
    // if any errors occurs result then send erros to response
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    //if no errors and gave a unique email that not mathes to any email in our database then send data to database
    else {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                res.status(400).json({ success: false, errorMsg: 'This email is already taken. Try with another one!' });
            } else {
                let salt = await bcrypt.genSalt(10);
                let hashPassword = await bcrypt.hash(req.body.password, salt);
                req.body.password = hashPassword;
                const userData = await User(req.body);
                userData.save();
                const data = {
                    user: {
                        id: userData.id
                    }
                }
                const authToken = jwt.sign(data, secretCode);
                res.json({ authToken, success: true, message: 'User created Successfully.' });
            }
        }
        catch (error) {
            res.status(400).json({ success: false, errorMsg: 'Internal server error!', message: error });
        }
    }
});


//ROUTE 2:user login with the login endpoint 
router.post('/login', [
    body('email', 'Please enter a valid email!').isEmail(),
    body('password', 'Password contains atleast 5 characters!').notEmpty()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    } else {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                res.status(400).json({ success: false, errorMsg: 'Please login with correct credentials.' });
            } else {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                    const authToken = jwt.sign(data, secretCode);
                    res.json({ authToken, success: true, message: 'Login Successfull.' });
                } else {
                    res.status(400).json({ success: false, errorMsg: 'Please login with correct credentials.' });
                }
            }
        } catch (error) {
            res.status(400).json({ success: false, errorMsg: 'Internal server error!', message: error });
        }
    }
});

//ROUTE 3:Get user details when login is success with a getuser end point 
router.get('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = await User.findById(userId).select("-password");
        res.json({ userData });
    } catch (error) {
        res.status(400).json({ success: false, errorMsg: 'Internal server error!', message: error })
    }
})

module.exports = router;