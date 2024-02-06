const express = require('express');
const path = require('path')

const expressConfig = (app) => {
    app.use(express.static('src/static'));
    app.use(express.urlencoded({extended: false}))

    return app;
}

module.exports = expressConfig;