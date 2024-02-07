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

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', async (req, res) => {
    const userData = req.body;

    let token = await authService.login(userData);

    if (token) {
        res.cookie('auth', token);
        res.redirect('/')
    } else {
        //TODO: need to add error handling
        res.end();
    } 
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
})

module.exports = router;