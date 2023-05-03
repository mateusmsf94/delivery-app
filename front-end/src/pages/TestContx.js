import React, { useContext } from 'react';
import MyContext from '../MyContext';

function ChildComponent() {
  const { value, changeValue } = useContext(MyContext);

  return (
    <div>
      <p>
        Value from context:
        {value}
      </p>
      <button type="button" onClick={ () => changeValue('New value') }>
        Change value
      </button>
    </div>
  );
}

export default ChildComponent;
