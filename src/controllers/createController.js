const router = require('express').Router();
const createService = require('../services/createService');
const jwt = require('jsonwebtoken');

const SECRET = require('../config/config');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/create', authMiddleware.isNotLoggedIn, (req, res) => {
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