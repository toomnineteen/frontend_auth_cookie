import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await register(form);
      if (response.status === 201) {
        toast.success(response?.data?.message || "register success");
        return navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.info(err?.response?.data?.message || "register failed");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <p>REGISTER</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input border w-full"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          className="input border w-full"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="input border w-full"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="btn btn-outline w-full" type="submit">
          {loading ? "Register...." : "Register"}
        </button>
      </form>
    </div>
  );
}
