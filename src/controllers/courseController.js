const router = require('express').Router();
const courseService = require('../services/courseService');
const mongoose = require('mongoose')

router.get('/courses/:courseId', async (req, res) => {
    let courseId = req.params.courseId;

    const courseData = await courseService.getCourseData(courseId);
    const ownerData = await courseService.getOwnerData({_id: courseData.owner});

    const isOwner = JSON.stringify(req.user?._id) === JSON.stringify(ownerData._id);
    let userId = new mongoose.Types.ObjectId(req.user?._id);
    
    let isSignedUp = false;
    //TODO: to think of a better way to perform the check if signUpList includes userId
    courseData.signUpList.map(x => {
        if (JSON.stringify(x._id) === JSON.stringify(userId)) {
            isSignedUp = true;
            return;
        }
    });
    
    let listOfStudents = [];

    courseData.signUpList.forEach((student) => listOfStudents.push(student.email));
    listOfStudents = listOfStudents.join(', ')
    
    let isLoggedIn = req.user;

    res.render('details', {courseData, ownerData, isOwner, isSignedUp, listOfStudents, isLoggedIn});
})

router.get('/courses/:courseId/sign-up', async (req, res) => {
    
    const courseId = req.params.courseId;
    const studentId = req.user._id;

    const signUpList = await courseService.signUp(studentId, courseId);
    res.redirect(`/courses/${courseId}`)
})

module.exports = router;