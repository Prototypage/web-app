import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navigation">
      Navbar
      <Link to={'/'}>Home</Link>
      {/* <Link to="/about">About</Link> */}
    </div>
  );
};

export default Navbar;

// helpers
