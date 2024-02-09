const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourseData = async (id) => {
    
    let courseData = await Course.findOne({_id: id}).populate('signUpList').lean();
    return courseData;
}

exports.getOwnerData = async (id) => {

    let ownerData = await User.findOne({_id: id._id}).lean();
    return ownerData;
}

exports.signUp = async (studentId, courseId) => {
    let courseInfo = await Course.findById(courseId);
    courseInfo.signUpList.push(studentId); 
    return courseInfo.save();
}

exports.editCourse = async (id, courseData) => {
    let updatedCourse = await Course.findByIdAndUpdate(id, courseData, {runValidators: true});
    // let updatedCourse = await Course.findOneAndUpdate({_id: id}, courseData, {runValidators: true})
    return updatedCourse;
}

exports.deleteCourse = async (id) => {
    let deletedCourse = await Course.findByIdAndDelete(id);
    return deletedCourse;
}