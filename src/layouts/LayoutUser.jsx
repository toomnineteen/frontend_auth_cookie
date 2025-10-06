import { Outlet } from "react-router-dom";
import NavUser from "../components/NavUser";

const LayoutUser = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavUser />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutUser;
