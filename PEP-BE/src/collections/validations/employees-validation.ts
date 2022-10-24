import * as Joi from 'joi';

const schemas = {
  checkEmployee: Joi.object().keys({
    name: Joi.string().trim().min(3).max(20),
    phoneNumber: Joi.number().integer().min(1000000001).max(9999999999),
    role: Joi.string().required().trim().required(),
    yearOfJoining: Joi.number().integer().min(2014).max(2021).required(),
    designation: Joi.string().trim().required(),
    empId: Joi.string().trim().required()
  }),
  checkId: Joi.object().keys({
    userId: Joi.string().trim().length(24)
  })
};

export default schemas;
