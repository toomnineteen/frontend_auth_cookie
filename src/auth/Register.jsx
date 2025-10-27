import { useState } from "react";
import { register } from "../api/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  
  const [registerData, setRegisterData] = useState({
    display_name: "",
    email: "",
    password: "",
  });

  const onChangeRegisterData = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !registerData.display_name ||
      !registerData.email ||
      !registerData.password
    ) {
      return toast.info(" All fields are required");
    }
    try {
      const response = await register(registerData);

      if(response.status == 200) {
        return toast.success("Registration successful. Please login.");
      }

    } catch (error) {
      console.log(error.response);
      toast.success(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="LOGO"
          src="https://cdn-icons-png.flaticon.com/128/17241/17241957.png"
          className="mx-auto h-15 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="display_name"
                name="display_name"
                type="text"
                value={registerData.display_name}
                onChange={onChangeRegisterData}
                required
                className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={registerData.email}
                onChange={onChangeRegisterData}
                required
                autoComplete="email"
                className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={register.password}
                onChange={onChangeRegisterData}
                required
                autoComplete="current-password"
                className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center mt-8 rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Create Account
            </button>
          </div>
        </form>

        <div>
          <p className="mt-10 text-center text-sm/6">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="underline font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Log in.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
