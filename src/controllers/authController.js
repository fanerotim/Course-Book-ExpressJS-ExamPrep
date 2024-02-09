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

    //adding the details of currently logged in user to the req object
    req.user = userData;

    let token = await authService.login(userData);
    
    if (token) {
        res.cookie('auth', token);
        res.redirect('/')
    } else {
        // TODO: need to add error handling
        res.render('login', {error: 'Username or password is incorrect.'});
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    req.user = undefined;
    res.redirect('/')
})

module.exports = router;