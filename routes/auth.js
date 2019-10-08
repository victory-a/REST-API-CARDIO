const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const{ registerValidation, loginValidation } = require('../models/validation');

router.get('/', async(req, res) => {
    const users = await User.find();
    try {
        res.send(users)
    } catch (error) {
        res.send({message: error})
    }
});

router.get('/:id', async(req, res) => {
    const user = await User.findOne({_id: req.params.id});
    try {
        res.send(user)
    } catch (error) {
        res.send({message: error})
    }
})

router.post('/register', async (req, res) => {
    // check if there is a validation error
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists already
    const emailExists = await User.findOne({email: req.body.email})
    if (emailExists) return res.status(400).send('Email already exists');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const rawUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
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
     // returns an object which will have an error property if an error occurs 
    if (error) return res.status(400).send(error.details[0].message);

    // check if email exists 
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('invalid email or password');

    //check if pasword is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password) 
    // returns true or false
    if (!validPassword) return res.status(400).send('Invalid email or Password');

    // create and assign token 
    const token = await jwt.sign({_id: user._id}, process.env.JWT_TOKEN);
    res.header('auth-token', token)

    res.send('logged in successfully')
});
  
module.exports = router;

