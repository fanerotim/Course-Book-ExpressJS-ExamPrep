const express = require('express');
const path = require('path')

const expressConfig = (app) => {
    app.use(express.static(path.resolve('src/static')));
    return app;
}

module.exports = expressConfig;