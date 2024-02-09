const jwt = require('jsonwebtoken');
const SECRET = require('../config/config');
const Course = require('../models/Course');

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

exports.isOwner = async (req, res, next) => {

    let courseInfo = await Course.findById(req.params.courseId);
    let ownerId = courseInfo.owner;

    let loggedUserId = req.user._id;
 
    if (JSON.stringify(ownerId) !== JSON.stringify(loggedUserId)) {
        return res.status(402).send('Unauthorized')
    }
    next(); 
}

exports.isLoggedIn = async (req, res, next) => {
    let isLoggedIn = req.user;

    if (isLoggedIn) {
        return res.status(402).send('Unauthorized');
    }
    next();
}

exports.isNotLoggedIn = async (req, res, next) => {
    if (!req.user) {
        return res.status(402).send('Unauthorized');
    }
    next();
}