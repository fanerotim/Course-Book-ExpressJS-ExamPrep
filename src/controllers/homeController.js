const router = require('express').Router();
const Course = require('../models/Course');

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/catalog', async (req, res) => {

    let courses = await Course.find().lean();

    res.render('catalog', {courses});
})

module.exports = router;