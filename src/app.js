const express = require('express');
const router = require('../src/routes/router');
const mongoose = require('mongoose');

const PORT = 5000;

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const app = express();

expressConfig(app);
handlebarsConfig(app);

app.use(router);

mongoose.connect('mongodb://127.0.0.1/course-book')
    .then((result) => {
        console.log('DB Connected');

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    })

