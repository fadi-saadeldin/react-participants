const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateParticipantInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = ' Fullname is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
