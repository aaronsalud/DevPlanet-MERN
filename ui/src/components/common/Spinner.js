import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  const style = {
    display: 'block',
    width: '200px',
    margin: 'auto'
  };

  const center = {
    margin: 'auto',
    padding: '20% 0'
  }
  return (

    <div style={center}>
      <img src={spinner} style={style} alt="Loading..." />
    </div>
  );
};

export default Spinner;
