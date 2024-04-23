import React from 'react'
import Supplier from './Supplier'
import Stats from './Stats'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';


const Home = () => {
  return (
      <div className="flex flex-1">
        <Sidebar />
        <Outlet />
      </div>
  );
}

export default Home