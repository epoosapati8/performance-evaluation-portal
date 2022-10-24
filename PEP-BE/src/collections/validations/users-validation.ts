import * as Joi from 'joi';

const domainPattern = /^([a-zA-Z0-9_\-\.]+)@(nineleaps.com)$/;
const userSchemas = {
  checkUser: Joi.object().keys({
    email: Joi.string().trim().email().regex(domainPattern).required(),
    password: Joi.string().trim().required(),
    empId: Joi.string().trim().length(24)
  }),
  checkId: Joi.object().keys({
    userId: Joi.string().trim().length(24)
  }),
  authUser: Joi.object().keys({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().trim().required()
  })
};

export default userSchemas;
