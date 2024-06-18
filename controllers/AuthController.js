const { validationResult } = require('express-validator');
const User = require('../models/User');


const logIn = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.json({error: errors.array()}) 
    }
    try{
        const result = await User.login(req.body.username, req.body.password)
        res.json(result)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

const signUp = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.json({error: errors.array()}) 
    }
    try{
        const result = await User.signup(req.body.username, req.body.password)
        res.json(result)
    }catch(err){
        res.sendStatus(500)
    }
}


module.exports = {
    logIn,
    signUp
}