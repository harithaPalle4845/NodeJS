const Joi = require('@hapi/joi')

const userSchema = Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    age: Joi.number().integer().min(0),
    userName: Joi.string(),
    password: Joi.string()

  })
  module.exports ={ userSchema}
