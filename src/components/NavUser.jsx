import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavUser = () => {
  const url = [
    {
      url: "/user",
      n: "Home",
    },
    {
      url: "/user/profile",
      n: "Profile",
    },
  ];

  const navigate = useNavigate();

  async function handle_logout() {
    try {
      const response = await logout();
      if (response.status === 200) {
        navigate("/login");
        toast.success("ออกจากระบบ");
        return;
      }
    } catch (error) {
      console.log("Error fetching data:", error?.response);
    }
  }

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center font-medium">
        <div className="navbar w-full bg-transparent shadow-xl">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">AI</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal capitalize flex items-center">
              {url.map((u, i) => (
                <li key={i}>
                  <Link key={i} to={u.url}>
                    {u.n}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  className="cursor-pointer hover:bg-primary"
                  onClick={handle_logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4 capitalize">
          {url.map((u, i) => (
            <li key={i}>
              <Link key={i} to={u.url}>
                {u.n}
              </Link>
            </li>
          ))}
          <li>
            <button className="mt-4 btn" onClick={handle_logout}>
              ออกจากระบบ
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavUser;
