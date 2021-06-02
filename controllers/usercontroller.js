const router = require('express').Router();
const {UserModel} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UniqueConstraintError } = require('sequelize');

// let bOne = bcrypt.hashSync('password123', 13);
// let bTwo =bcrypt.hashSync('abc123', 13);
// console.log('b-One:',bOne);
// console.log('b-Two:', bTwo);
// console.log('one to two same?', bcrypt.compareSync(bOne, bTwo));
// console.log('one to string same?', bcrypt.compareSync('abc123', bTwo));

// ^shows that you can use this to compare values- even though you cant see the encrypted info, if you have it, can check and see if it is equal to the encrpyted info

router.post('/register', async(req, res) => {
    const { firstName, lastName, email, password} = req.body;

    try{
        const newUser = await UserModel.create(
            {firstName, lastName, email, password: bcrypt.hashSync(password, 13)
        })
        const token = jwt.sign(
            {id: newUser.id,},
            process.env.JWT_SECRET,
            {expiresIn: 60*60*24}
            // 60 seconds, 60 minutes, 24 hours- 1 day.. can also be 1D, 7D for days...
        )
        res.status(201).json({
            message: 'User registered',
            user: newUser,
            token
        })
    } catch (err) {
        if(err instanceof UniqueConstraintError){
            res.status(409).json({
                message: 'email already in use'
            });
        } else {
            res.status(500).json({
                error: `Failed to register user: ${err}`
            })
        }
    }
})

router.post('/login', async(req, res) =>{
    let {email, password} = req.body;

    try{
        let loginUser = await UserModel.findOne({
        where: { email: email }, 
        })
        if(loginUser){
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if(passwordComparison){
                let token = jwt.sign(
                    {id: loginUser.id},
                    process.env.JWT_SECRET,
                    {expiresIn: 60*60*24}
                )
                res.status(200).json({
                    user: loginUser,
                    message: 'User sucessfully logged in',
                    token
                })
            } else{
                res.status(401).json({
                    message: 'incorrect email or password'
                })
            }
        } else {
            res.status(401).json({
                message: 'incorrect email or password'
            })
        }
    } catch (err){
        res.status(500).json({
            message: `Error logging in: ${err}`
        })
    }
})
module.exports =router;