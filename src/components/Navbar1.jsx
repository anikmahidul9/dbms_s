import React from "react";
import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <div className="navbar bg-gray-100">
      <div className="navbar-center hidden lg:flex mx-auto">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/register'>Register</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/user-list'>Report</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to='/dashboard' className="btn">Dashboard</Link>
      </div>
    </div>
  );
};

export default Navbar1;
