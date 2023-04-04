const Joi = require("joi");

//Validator Object 
const webhook = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().required(),
  }),
};

module.exports = webhook;
