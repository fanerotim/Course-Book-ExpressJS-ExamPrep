const router = require('express').Router();
const Course = require('../models/Course');

router.get('/profile', async (req, res) => {
    let userId = req.user._id;

    let courses = await Course.find({owner: userId}).lean();
    let enrolledCourses = await Course.find({signUpList: userId}).lean();

    let totalCreatedCourses = courses.length;
    let totalEnrolledCourses = enrolledCourses.length;
    let userEmail = req.user.email;

    res.render('profile', {courses, enrolledCourses, totalCreatedCourses, totalEnrolledCourses, userEmail});
})

module.exports = router;