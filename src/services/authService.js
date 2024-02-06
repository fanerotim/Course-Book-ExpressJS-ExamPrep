const User = require('../models/User');
const bcrypt = require('bcrypt');

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