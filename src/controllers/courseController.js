const router = require('express').Router();
const courseService = require('../services/courseService');

router.get('/courses/:courseId', async (req, res) => {
    let courseId = req.params.courseId;

    const courseData = await courseService.getCourseData(courseId);
    const ownerData = await courseService.getOwnerData({_id: courseData.owner});

    const isOwner = JSON.stringify(req.user?._id) === JSON.stringify(ownerData._id);

    res.render('details', {courseData, ownerData, isOwner});
})

module.exports = router;