const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
})

exports.validate_userdata_input = validator.query({
  firstname: Joi.string(),
  lastname: Joi.string(),
  date_of_birth: Joi.date(),
  email: Joi.string().email(),
  number: Joi.string(),
  avatar_url: Joi.string()
}, { joi: { abortEarly: false } })
