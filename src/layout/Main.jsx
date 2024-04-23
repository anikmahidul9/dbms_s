import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar1";


const Main = () => {
  return (
    <>
      <Navbar />
      <Navbar1/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
