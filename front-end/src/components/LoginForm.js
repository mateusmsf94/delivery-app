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

  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <AuthHeader />
      <InputField
        label="Email"
        type="email"
        name="email"
        id="email"
        dataTestId="common_login__input-email"
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
        dataTestId="common_login__input-password"
        value={ password }
        onChange={ handlePasswordChange }
      />
      {passwordError && (
        <p className="mx-5 text-sm text-red-500">{passwordError}</p>
      )}
      <div className="mx-5 my-4">
        <button
          type="submit"
          onClick={ handleSubmit }
          className={ `w-full py-2 px-4 bg-green-600 text-white font-semibold 
          rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 
          focus:ring-primary-600 focus:ring-opacity-50 mb-2` }
        >
          Log in
        </button>
        <button
          type="button"
          onClick={ redirectToRegister }
          dataTestId="common_login__button-register"
          className={ `w-full py-2 px-4 bg-white text-green-600 font-semibold 
          rounded-lg hover:bg-green-300 focus:outline-none focus:ring-2 
          focus:ring-green-600 focus:ring-opacity-50 mb-2 border border-green-600` }
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
