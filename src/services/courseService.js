const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getCourseData = async (id) => {
    
    let courseData = await Course.findOne({_id: id}).lean();
    return courseData;
}

exports.getOwnerData = async (id) => {

    let ownerData = await User.findOne({_id: id._id}).lean();
    return ownerData;
}