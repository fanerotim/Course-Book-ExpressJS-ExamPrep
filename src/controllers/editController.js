const router = require('express').Router();
const Course = require('../models/Course');
const courseService = require('../services/courseService');

router.get('/courses/:courseId/edit', async (req, res) => {
    let courseId = req.params.courseId;

    let courseData = await courseService.getCourseData(courseId);

    res.render('edit', {courseData});
})

router.post('/courses/:courseId/edit', async (req, res) => {
    let updatedCourseInfo = req.body;
    let courseId = req.params.courseId;

    let updatedCourse = await courseService.editCourse(courseId, updatedCourseInfo);
    res.redirect(`/courses/${courseId}/`)
})

module.exports = router;