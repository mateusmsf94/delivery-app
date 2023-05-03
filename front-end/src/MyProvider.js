import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [value, setValue] = useState('Initial value');

  const changeValue = (newValue) => {
    setValue(newValue);
  };

  const contextValue = useMemo(() => ({ value, changeValue }), [value]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
