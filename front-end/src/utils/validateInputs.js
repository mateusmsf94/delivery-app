const validateEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!email) return '';
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return '';
};

const validatePassword = (password) => {
  const minPasswordLength = 5;

  if (!password) return '';
  if (password.length < minPasswordLength) {
    return 'Password must be at least 6 characters';
  }

  return '';
};

const validateName = (name) => {
  const minNameLength = 11;
  if (!name) return '';
  if (name.length < minNameLength) {
    return 'Name must be at least 12 characters';
  }

  return '';
};

export { validateEmail, validatePassword, validateName };
