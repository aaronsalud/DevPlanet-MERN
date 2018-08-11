import React from 'react';

export default () => {
  return (
    <div>
      <footer className="bg-dark text-white mt-5 p-4 fixed-bottom text-center">
        Copyright &copy; {new Date().getFullYear()} Dev Planet
      </footer>
    </div>
  );
};
