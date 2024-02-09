const router = require('express').Router();

const authService = require('../services/authService');
const authMiddleware = require('../middlewares/authMiddleware');
const errorUtil = require('../utils/errorUtil');

router.get('/register', authMiddleware.isLoggedIn, (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        let result = await authService.register(userData);
        res.redirect('/');
    } catch(err) {
        res.render('register', {error: errorUtil.getErrorMessage(err)})
    }  
})

router.get('/login', authMiddleware.isLoggedIn, (req, res) => {
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
        res.render('login', {error: 'Username or password is incorrect. Please try again.'});
    }
})

router.get('/logout', authMiddleware.isNotLoggedIn, (req, res) => {
    res.clearCookie('auth');
    req.user = undefined;
    res.redirect('/')
})

module.exports = router;