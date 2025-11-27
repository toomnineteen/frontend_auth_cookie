import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    display_name: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(form);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message)
        return navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.info(err.response.data.message)
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <p>REGISTER</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input border w-full"
          name="display_name"
          placeholder="display_name"
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
          Register
        </button>
      </form>
    </div>
  );
}
