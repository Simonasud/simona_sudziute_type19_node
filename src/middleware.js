// middleware.js

const validateFields = (requiredFields) => (req, res, next) => {
  const missingFields = [];
  const invalidFields = [];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0 || invalidFields.length > 0) {
    const errors = {};

    if (missingFields.length > 0) {
      errors.missingFields = missingFields;
    }

    if (invalidFields.length > 0) {
      errors.invalidFields = invalidFields;
    }

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

module.exports = {
  validateFields,
};
