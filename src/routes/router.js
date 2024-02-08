const router = require('express').Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const createController = require('../controllers/createController');
const courseController = require('../controllers/courseController');


router.use(homeController);
router.use(authController);
router.use(createController);
router.use(courseController);

router.get('*', (req, res) => {
    res.redirect('404');
})

module.exports = router;