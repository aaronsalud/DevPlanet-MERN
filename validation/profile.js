const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
  let errors = {};

  const field_attributes = ['handle', 'status', 'skills'];
  const url_field_attributes = [
    'website',
    'youtube',
    'linkedin',
    'facebook',
    'twitter',
    'instagram'
  ];

  field_attributes.forEach(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : '';
  });

  // Validate url inputs
  url_field_attributes.forEach(field => {
    if (!isEmpty(data[field]) && !Validator.isURL(data[field])) {
      errors[field] = 'Not a valid Url';
    }
  });

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
