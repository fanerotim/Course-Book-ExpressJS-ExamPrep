const jwt = require('jsonwebtoken');
const SECRET = require('../config/config');

//Checks if there is a logged in user and renders navigation accordingly

exports.isAuth = (req, res, next) => {
    let token = req.cookies['auth'];

    if (!token) {
        res.locals.isNotAuthenticated = true;
        return next();
    }

    const decodedToken = jwt.verify(token, SECRET);

    if (decodedToken) {
        req.user = decodedToken;
    } else {
        res.locals.isNotAuthenticated = true;
        res.clearCookie('auth');
        res.redirect('/login');
    }
    
    next(); 
}