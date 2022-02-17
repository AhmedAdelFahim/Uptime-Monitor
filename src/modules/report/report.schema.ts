import Joi from 'joi';

export const get = Joi.object({
  id: Joi.string(),
  tag: Joi.string(),
}).xor('id', 'tag').messages({
  'object.xor': 'must provide url id or tag',
});
