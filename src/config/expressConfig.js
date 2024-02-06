const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const {isAuth} = require('../middlewares/authMiddleware')

const expressConfig = (app) => {
    app.use(express.static('src/static'));
    app.use(express.urlencoded({extended: false}))
    app.use(cookieParser());
    app.use(isAuth)
    
    return app;
}

module.exports = expressConfig;