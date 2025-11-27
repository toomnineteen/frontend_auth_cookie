import { useState, useEffect } from "react";
import useAuthCookie from "../store/authCookieStore";
import { profile } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";
import { useNavigate } from "react-router-dom";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useAuthCookie((state) => state.user);
  const token = useAuthCookie((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      profile(token)
        .then((res) => {
          if (res?.data?.user?.role === "user") {
            setOk(true);
          } else {
            navigate(-1);
          }
        })
        .catch(() => setOk(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
