const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN); // returns the user id if valid
        req.user = verified;
        next(); 
    } catch (error) {
        res.status(400).send('Invalid token');  
    }
}

module.exports = verifyToken;