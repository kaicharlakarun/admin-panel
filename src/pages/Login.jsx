import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", form);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-lg">
        <div className="rounded-t-3xl bg-slate-200 px-6 py-5 flex items-center justify-between">
         
<div
  className="relative w-full h-50  overflow-hidden"
  style={{
    backgroundImage: `url('/src/assets/login_bg.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  
  <div className="absolute inset-0 bg-black/40" />
  <div className="absolute top-1/2 left-6 -translate-y-1/2 z-10 text-white">
    <p className="text-xl font-semibold"> Welcome Whatnot</p>
    <p className="text-xl font-semibold"> Admin</p>
  </div>
  </div>
        </div>
        <div className="-mt-7 px-7">
          <div className="h-14 w-14 rounded-full bg-white shadow-md flex items-center justify-center">
            <span className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
              W
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 pr-10 text-sm outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          >
            Log In
          </button>

          <button
            type="button"
            className="mx-auto block text-xs text-slate-500 hover:text-slate-700"
          >
            🔒 Forgot your password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
