const router = require('express').Router();

const authService = require('../services/authService');


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    //TODO: Complete error handling
    await authService.register(userData);
    
    res.redirect('/');
})

module.exports = router;