import PropTypes from 'prop-types';

function InputField({ label, type, name, id, dataTestId, value, onChange }) {
  return (
    <div>
      <label htmlFor={ id } className="block mb-2 text-md font-medium text-gray-900 mx-5">
        {label}
        <input
          type={ type }
          name={ name }
          id={ id }
          data-testid={ dataTestId }
          className={ `bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
          rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5` }
          value={ value }
          onChange={ onChange }
        />
      </label>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']).isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
