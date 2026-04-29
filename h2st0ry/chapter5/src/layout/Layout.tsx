import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#f5efe6]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
