const express = require('express');
const router = require('../src/routes/router')

const PORT = 5000;

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const app = express();

expressConfig(app);
handlebarsConfig(app);

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})