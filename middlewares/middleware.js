const { body } = require('express-validator');
const jwt = require("jsonwebtoken");

const authValidationRules = [
    body('username').isLength({ min: 4, max: 20 }).withMessage("Username must be 4-20 in length"),
    body('password').isLength({ min: 5, max: 20 }).withMessage("Password must be 5-20 in length")
  ];
const postValidation = [
    body("title").notEmpty().withMessage("Title is required"),
    body("body").notEmpty().isLength({max: 500}).withMessage("Body is required and max length is 500")
]
const tagValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .custom(value => {
            const words = value.trim().split(/\s+/);
            if (words.length > 2) {
                throw new Error('Name must have at most 2 words');
            }
            return true;
        })
]



  function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        try{
            const veryf = jwt.verify(bearerToken, process.env.SECRET_KEY)
            req.body.tokenUserInfo = veryf
            next();
        }catch(err){
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else {
                return res.status(403).json({ message: 'Token is invalid' });
            }
        }
    } else {
        res.sendStatus(403);
    }
}

  module.exports = {
    authValidationRules,
    postValidation,
    tagValidation,
    verifyToken
  }