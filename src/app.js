const express = require('express');
let router = express.Router();

const PORT = 5000;

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const app = express();

expressConfig(app);
handlebarsConfig(app);

router.get('/', (req, res) => {
    res.render('home', {layout: false})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})