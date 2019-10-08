const router = require('express').Router();
const User = require('../models/User');
const{ registerValidation, loginValidation } = require('../models/validation');


router.post('/register', async (req, res) => {
    // check if there is a validation error
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists already
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already exists');

    const rawUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const user = await User.create(rawUser);
        res.send(user);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/login', async (req, res) => {
    //check for validaton error
    const {error} = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // check if email exists 
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('invalid email or password');

    res.send('logged in successfully')

});

module.exports = router;

