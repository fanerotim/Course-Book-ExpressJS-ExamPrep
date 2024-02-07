const router = require('express').Router();
const Course = require('../models/Course');

router.get('/', async (req, res) => {
    let lastThree = await Course.find().sort({_id: -1}).limit(3).lean();

    res.render('home', {lastThree});
})

router.get('/catalog', async (req, res) => {

    let courses = await Course.find().lean();

    res.render('catalog', {courses});
})

module.exports = router;