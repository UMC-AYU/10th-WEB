import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col gap-10 justify-center">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
