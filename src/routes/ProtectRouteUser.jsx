/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { current_user } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("RUN...");
      try {
        const response = await current_user();
        console.log(response);
        if (response.status === 401 || response.status === 403) {
          navigate("/login");
          return;
        }
        if (response.statusText === "OK") {
          setOk(true);
        } else {
          setError(response.data.message);
          setOk(false);
        }
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        console.log("Error fetching profile:", err?.response?.statusText);
        if (err?.response?.status === 401 || err?.response?.status === 403) {
          toast.info("กรุณาเข้าสู่ระบบใหม่");
          navigate("/login");
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center">กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div className="text-center">มีข้อผิดพลาด: {error}</div>;
  }

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
