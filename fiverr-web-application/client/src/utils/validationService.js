// Validation rules for different forms
const validationRules = {
  // Gig validation rules
  gig: {
    title: {
      required: true,
      minLength: 15,
      maxLength: 100,
    },
    description: {
      required: true,
      minLength: 50,
      maxLength: 1000,
    },
    price: {
      required: true,
      min: 1,
    },
    category: {
      required: true,
    },
  },

  // User validation rules
  user: {
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^[a-zA-Z0-9_]{8,}$/,
      customError: 'Password must be at least 8 characters long and can only contain letters, numbers, and underscores'
    },
  },

  // Login validation rules
  login: {
    username: {
      required: true,
      minLength: 3,
    },
    password: {
      required: true,
      minLength: 6,
    },
  },
};

// Validation functions
const validateField = (value, rules) => {
  if (!rules) return { isValid: true, errors: [] };

  const errors = [];

  if (rules.required && !value) {
    errors.push('This field is required');
    return { isValid: false, errors };
  }

  if (value) {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Minimum length is ${rules.minLength} characters`);
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`Maximum length is ${rules.maxLength} characters`);
    }

    if (rules.min && Number(value) < rules.min) {
      errors.push(`Minimum value is ${rules.min}`);
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(rules.customError || 'Invalid format');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate entire form
const validateForm = (data, formType) => {
  const rules = validationRules[formType];
  if (!rules) return { isValid: true, errors: {} };

  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const result = validateField(data[field], rules[field]);
    if (!result.isValid) {
      errors[field] = result.errors;
      isValid = false;
    }
  });

  return {
    isValid,
    errors,
  };
};

// Helper function to format validation errors for display
const formatValidationErrors = (errors) => {
  if (!errors) return {};

  return Object.keys(errors).reduce((formatted, field) => {
    formatted[field] = errors[field].join('. ');
    return formatted;
  }, {});
};

// Export all functions and rules
export {
  validateField,
  validateForm,
  formatValidationErrors,
  validationRules,
}; 