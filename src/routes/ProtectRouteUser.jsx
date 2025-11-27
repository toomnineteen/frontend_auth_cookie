import { useState, useEffect } from "react";
import { profile } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProtectRouteUser = ({ element }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    loading: true,
  });

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // ✅ ป้องกัน memory leak

    const fetchProfile = async () => {
      try {
        const response = await profile();

        if (isMounted && response.status === 200) {
          setState({ isAuthenticated: true, loading: false });
        }
      } catch (err) {
        if (!isMounted) return; // ✅ Component unmounted แล้ว

        const status = err?.response?.status;

        if (status === 401 || status === 403) {
          toast.info("เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบใหม่");
          setState({ isAuthenticated: false, loading: false });
          navigate("/login", { replace: true }); // ✅ replace: true
          return; // ✅ return ทันที
        }

        // Error อื่นๆ
        console.error("Profile fetch error:", err);
        setState({ isAuthenticated: false, loading: false });
      }
    };

    fetchProfile();

    return () => {
      isMounted = false; // ✅ Cleanup
    };
  }, [navigate]); // ✅ เพิ่ม navigate

  // ✅ Loading state
  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  // ✅ Authenticated
  if (state.isAuthenticated) {
    return element;
  }

  // ✅ Not authenticated - redirect
  return <LoadingToRedirect />;
};

export default ProtectRouteUser;
