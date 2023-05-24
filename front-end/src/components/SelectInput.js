import React from 'react';
import PropTypes from 'prop-types';

function SelectInput({ sellers, value, handleChange }) {
  return (
    <label htmlFor="seller-select" className="font-normal text-xs">
      P. Vendedora Responsável:
      <select
        id="seller-select"
        className="font-normal text-xs w-full p-2 border border-black rounded bg-white"
        data-testid="customer_checkout__select-seller"
        onChange={ handleChange }
        value={ value }
      >
        <option value="">Vendedor</option>
        {sellers.map((seller) => (
          <option key={ seller.id } value={ seller.id }>
            {seller.name}
          </option>
        ))}
      </select>
    </label>
  );
}

SelectInput.propTypes = {
  sellers: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectInput;
