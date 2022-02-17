import Joi from 'joi';
import {Protocol} from './url.interface';

export const create = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'name is required',
  }),
  url: Joi.string().trim().required().messages({
    'any.required': 'url is required',
  }),
  protocol: Joi.string().trim().valid(Protocol.HTTPS, Protocol.HTTP).required().messages({
    'any.required': 'protocol is required',
    'any.only': 'protocol must be one of [http, https].',
  }),
  path: Joi.string().trim().optional(),
  port: Joi.number().integer().port().optional(),
  threshold: Joi.number().integer().min(1).optional(),
  interval: Joi.string().trim().pattern(new RegExp(/(^([0-1]?[0-9]|2[0-3])h$)|(^[0-5][0-9]m$)/)).optional()
    .messages({
      'string.pattern.base': 'interval must be value between [00m-59m] or [00h-23h] m for minute and h for hour.',
    }),
  timeout: Joi.number().integer().positive().max(30).optional(),
  webhook: Joi.string().trim().optional(),
  httpHeaders: Joi.object(),
  authentication: Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }).optional(),
  assert: Joi.object({
    statusCode: Joi.number().integer().required(),
  }).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  ignoreSSL: Joi.alternatives().conditional('protocol', {
    is: 'https',
    then: Joi.boolean().required(),
    otherwise: Joi.boolean().optional(),
  }),
});
