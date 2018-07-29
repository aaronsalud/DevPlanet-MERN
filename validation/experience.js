const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateExperienceInput(data) {
  let errors = {};

  // Required fields
  const key_attributes = ['title', 'company', 'from'];

  key_attributes.forEach(key => {
    data[key] = !isEmpty(data[key]) ? data[key] : '';
  });

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
