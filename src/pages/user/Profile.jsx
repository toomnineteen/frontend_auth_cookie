/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { profile } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profile();
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        console.log("Error fetching profile:", err?.response);
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
    return <div className="text-center capitalize">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center capitalize">
        something went wrong : {error}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-4 container mx-auto">
      <div>
        <div>
          <p className=" font-bold">My Profile</p>
          <div className="divider"></div>
          <div>
            <p>Full name : {user?.user?.display_name}</p>
            <p>Email : {user?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
