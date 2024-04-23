import React from 'react';
import { Link, Outlet } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <div className="w-64 bg-gray-800 text-white h-full">
          <div className="p-4">
            <h1 className="text-xl font-semibold">Sidebar</h1>
          </div>
          <ul>
            <li className="p-4">
              <Link to="/dashboard">Home</Link>
            </li>
            <li className="p-4">
              <Link to="/dashboard/supplier-details">Supplier</Link>
            </li>
            <li className="p-4">
              <Link to="/dashboard/supplier">Add Supplier</Link>
            </li>
            <li className="p-4">
              <Link to="/dashboard/product">Product</Link>
            </li>
            {/* Add more sidebar links */}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;