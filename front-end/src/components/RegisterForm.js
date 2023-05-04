import { useState } from 'react';
import AuthHeader from './AuthHeader';
import InputField from './InputField';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const minPasswordLength = 6;
  const minNameLength = 12;

  const validateEmail = () => {
    // Regular expression to check for a valid email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < minPasswordLength) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const validateName = () => {
    if (name.length < minNameLength) {
      setNameError('Name must be at least 12 characters');
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateName();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <AuthHeader />
      <InputField
        label="Name"
        type="text"
        name="name"
        id="name"
        dataTestId="common_register__input-name"
        value={ name }
        onChange={ handleNameChange }
      />
      {nameError && (
        <p className="mx-5 text-sm text-red-500">{nameError}</p>
      )}
      <InputField
        label="Email"
        type="email"
        name="email"
        id="email"
        dataTestId="common_register__input-email"
        value={ email }
        onChange={ handleEmailChange }
      />
      {emailError && (
        <p className="mx-5 text-sm text-red-500">{emailError}</p>
      )}
      <InputField
        label="Password"
        type="password"
        name="password"
        id="password"
        dataTestId="common_register__input-password"
        value={ password }
        onChange={ handlePasswordChange }
      />
      {passwordError && (
        <p className="mx-5 text-sm text-red-500">{passwordError}</p>
      )}
      <div className="mx-5 my-4">
        <button
          type="submit"
          className={ `w-full text-white bg-green-700 hover:bg-primary-700
          focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg 
          px-5 py-2.5` }
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
