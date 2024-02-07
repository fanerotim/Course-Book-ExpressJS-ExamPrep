const router = require('express').Router();
const createService = require('../services/createService');
const jwt = require('jsonwebtoken');

const SECRET = require('../config/config')

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', async (req, res) => {
    let userData = req.body;
    
    let token = req.cookies['auth'];
    let loggedUser = jwt.decode(token, SECRET);

    userData['owner'] = loggedUser._id;

    await createService.create(userData);

    res.redirect('/catalog')
})

module.exports = router;