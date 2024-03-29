const router = require('express').Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const createController = require('../controllers/createController');
const courseController = require('../controllers/courseController');
const editController = require('../controllers/editController');
const profileController = require('../controllers/profileController');


router.use(homeController);
router.use(authController);
router.use(createController);
router.use(courseController);
router.use(editController);
router.use(profileController);


router.get('*', (req, res) => {
    res.redirect('404');
})

module.exports = router;