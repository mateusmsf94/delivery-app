import AuthHeader from './AuthHeader';
import InputField from './InputField';

function RegisterForm() {
  return (
    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <AuthHeader />
      <InputField
        label="Name"
        type="text"
        name="name"
        id="name"
        dataTestId="common_register__input-name"
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        id="email"
        dataTestId="common_register__input-email"
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        id="password"
        dataTestId="common_register__input-password"
      />
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
