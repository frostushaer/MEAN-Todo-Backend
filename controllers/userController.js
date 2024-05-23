const User = require('../models/user');

const userController = {
    // Adding user detail in the database
    register: async (req, res) => {
        try {
            const { name, email, uid } = req.body;

            let userFound = await User.findOne({ uid: uid });

            if (userFound) {
                userFound.name = name;
                userFound.email = email;
                return res.status(200).json({ message: 'User already exists, info updated!' });
            }
            else 
            {
                const newUser = new User({
                    name: name,
                    email: email,
                    uid: uid
                });

                await newUser.save();
                res.status(201).json({ message: 'User added successfully' })
            } 
        } catch (error) {
            console.log(`error: ${error.message}`);
        }
    },

};

module.exports = userController;