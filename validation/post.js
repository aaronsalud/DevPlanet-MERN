const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validatePostInput(data) {
  let errors = {};

  // Required Fields
  const field_attributes = ['text'];

  field_attributes.forEach(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : '';
  });

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
