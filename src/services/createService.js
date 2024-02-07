const Course = require('../models/Course')

exports.create = (userData) => Course.create(userData);