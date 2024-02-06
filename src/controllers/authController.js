const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;
    //TODO; I have to complete the register service
    res.end();
})

module.exports = router;