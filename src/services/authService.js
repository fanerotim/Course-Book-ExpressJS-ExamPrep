const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = require('../config/config');

exports.register = async (userData) => {

    //Check if user exists
    const hasUser = await User.findOne({email: userData.email});

    if (hasUser) {
        console.log('Username or password you are trying to use are already taken.')
        //TODO: Error handling
        return;
    }

    if (userData.password === userData.rePassword) {
   
        let hashedPassword = await bcrypt.hash(userData.password, 12);

        let newUser = {
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        }

        User.create(newUser);
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