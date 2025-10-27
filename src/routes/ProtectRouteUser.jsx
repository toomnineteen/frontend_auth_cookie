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
      try {
        await current_user();
        setOk(true);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          toast.info("เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบใหม่");
          navigate("/login");
        } else {
          setError(
            "เกิดข้อผิดพลาดในการดึงข้อมูล: " + (err?.message || "Unknown error")
          );
        }
        setOk(false);
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