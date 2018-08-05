import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  const style = {
    display: 'block',
    width: '200px',
    margin: 'auto'
  };
  return (
    <div>
      <img src={spinner} style={style} alt="Loading..." />
    </div>
  );
};

export default Spinner;
