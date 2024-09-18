const jwt = require('jsonwebtoken');
const secretCode = "parveenisa@good$boy";


const fetchUser = (req, res, next) => {
    //get user from the JWT token and add id to the request object
    const token = req.header("authToken");
    if (!token) {
        res.status(401).send({ success: false, errorMsg: "Please authenticate with a valid token!" })
    } else {
        try {
            const data = jwt.verify(token, secretCode);
            // console.log(data);
            // console.log(data.user);
            req.user = data.user;
            next()
        } catch (error) {
            res.status(401).send({ success: false, errorMsg: "Please authenticate with a valid token!" })
        }
    }
}



module.exports = fetchUser;
