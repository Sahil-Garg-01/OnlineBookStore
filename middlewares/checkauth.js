const jwt = require('jsonwebtoken');
const { User } = require('../models/user-model');

async function checkAuth(req, res, next) {
    try {
        const token = req.cookies.token;
        
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findOne({ email: decoded.email }).select('-password');
            
            res.locals.user = user;
        } else {
            res.locals.user = null;
        }
        
        next();
    } catch (error) {
        res.locals.user = null;
        next();
    }
}

module.exports = checkAuth;