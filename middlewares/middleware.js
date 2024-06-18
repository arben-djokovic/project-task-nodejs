const { body } = require('express-validator');

const authValidationRules = [
    body('username').isLength({ min: 4, max: 20 }).withMessage("Username must be 4-20 in length"),
    body('password').isLength({ min: 5, max: 20 }).withMessage("Password must be 5-20 in length")
  ];

  module.exports = {
    authValidationRules
  }