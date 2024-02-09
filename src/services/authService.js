const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = require('../config/config');

exports.register = async (userData) => {

    const hasUser = await User.findOne({email: userData.email});
    
    if (hasUser) {
        throw new Error('Username or password do not match. Please try again.')
    }

    if (userData.password === userData.rePassword) {
   
        let hashedPassword = await bcrypt.hash(userData.password, 12);

        let newUser = {
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        }

        User.create(newUser);
    } else {
        throw new Error('Password mismatch. Please try again.')
    }
}

exports.login = async (userData) => {
    let user = await User.findOne({email: userData.email});

    let isPassCorrect;

    if (user) {
        isPassCorrect = await bcrypt.compare(userData.password, user.password);
    }

    if (!user || !isPassCorrect) {
        console.log('Username or password is incorrect. Please try again.');
        return;
    }

    let payload = {
        _id: user._id,
        email: user.email
    }

    let token = jwt.sign(payload, SECRET);
    return token;
}