import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {
  
  return (
    <div className="flex flex-col min-h-screen">

      <Nav />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;