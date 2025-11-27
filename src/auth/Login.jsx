import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthCookie from "../store/authCookieStore";

export default function Login() {

  const actionLogin = useAuthCookie((state) => state.actionLogin);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    try {
      setLoading(true);
      const response = await actionLogin(form);
      if (response.status === 200) {
        toast.success("Logged in");
        navigate("/user");
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
      toast.info(err?.response?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <p>LOGIN</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input border w-full"
          name="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          className="input border w-full"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="btn btn-outline w-full border" type="submit">
          {loading ? "login...." : "login"}
        </button>
      </form>
    </div>
  );
}
