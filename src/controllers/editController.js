const router = require('express').Router();
const Course = require('../models/Course');
const courseService = require('../services/courseService');
const authMiddleware = require('../middlewares/authMiddleware');
const errorUtil = require('../utils/errorUtil');

router.get('/courses/:courseId/edit', authMiddleware.isOwner, async (req, res) => {
    let courseId = req.params.courseId;

    let courseData = await courseService.getCourseData(courseId);

    res.render('edit', {courseData});
})

router.post('/courses/:courseId/edit', async (req, res) => {
    let updatedCourseInfo = req.body;
    let courseId = req.params.courseId;

    try {
        let updatedCourse = await courseService.editCourse(courseId, updatedCourseInfo);
        res.redirect(`/courses/${courseId}/`)
    } catch(err) {
        let courseData = req.body;
        res.render(`edit`, {error: errorUtil.getErrorMessage(err), courseData})
    }
});

router.get('/courses/:courseId/delete', authMiddleware.isOwner, async (req, res) => {
    let courseId = req.params.courseId;
    let deletedCourse = await courseService.deleteCourse(courseId);
  
    res.redirect('/catalog')
})

module.exports = router;