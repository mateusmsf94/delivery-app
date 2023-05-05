import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthHeader from './AuthHeader';
import InputField from './InputField';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const minPasswordLength = 6;
  const history = useHistory();

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword();
  };

  const redirectToRegister = () => {
    history.push('/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from server:', data);
        // Handle successful login, e.g. store token, redirect to the main page, etc.
      } else {
        // Handle unsuccessful login, e.g. display an error message
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (error) {
      // Handle network errors or other issues with the API request
      console.error('Error:', error);
    }
  };

  const isDisabled = emailError || passwordError || email === '' || password === '';

  return (
    <form
      className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
      onSubmit={ handleSubmit }
    >
      <AuthHeader />
      <InputField
        label="Email"
        type="email"
        name="email"
        id="email"
        datatestid="common_login__input-email"
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
        datatestid="common_login__input-password"
        value={ password }
        onChange={ handlePasswordChange }
      />
      {passwordError && (
        <p className="mx-5 text-sm text-red-500">{passwordError}</p>
      )}
      <div className="mx-5 my-4">
        <button
          type="submit"
          disabled={ isDisabled }
          data-testid="common_login__button-login"
          className={ `w-full py-2 px-4 bg-green-600 text-white font-semibold 
          rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 
          focus:ring-primary-600 focus:ring-opacity-50 mb-2 
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}` }
        >
          Log in
        </button>
        <button
          type="button"
          onClick={ redirectToRegister }
          data-testid="common_login__button-register"
          className={ `w-full py-2 px-4 bg-white text-green-600 font-semibold 
          rounded-lg hover:bg-green-300 focus:outline-none focus:ring-2 
          focus:ring-green-600 focus:ring-opacity-50 mb-2 border border-green-600` }
        >
          Register
        </button>
      </div>

    </form>
  );
}

export default LoginForm;
