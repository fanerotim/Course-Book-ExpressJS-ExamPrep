const router = require('express').Router();
const createService = require('../services/createService');
const jwt = require('jsonwebtoken');

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', async (req, res) => {
    let userData = req.body;
    
    let token = req.cookies['auth'];
    let loggedUser = jwt.decode(token, 'adshjapdsipo234mnlfs-09i23-05rlesw');

    userData['owner'] = loggedUser._id;
    

    await createService.create(userData);
})

module.exports = router;