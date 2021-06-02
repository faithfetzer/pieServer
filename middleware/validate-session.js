require('dotenv').config()
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models');

const validateSession = async (req, res, next) =>{
    if(req.method === 'OPTIONS'){
        return next()
    }else if(req.headers.authorization){
        const {authorization} = req.headers;
        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined
        if(payload){
            let foundUser = await UserModel.findOne({
                where: {id: payload.id}
            });
            if(foundUser){
                req.user = foundUser;
                next()
            } else {
                res.status(400).send({
                    message: 'not authorized'
                })
            }
        }else{
            res.status(401).send({
                message: 'invalid token'
            })
        }
    } else {
        res.status(403).send({
            message: 'forbidden'
        })
    }
}

module.exports = validateSession;