import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, email, password } = formData;

    if (firstName.length < 2) return "First name must be at least 2 characters";
    if (lastName.length < 2) return "Last name must be at least 2 characters";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";

    if (password.length < 6) return "Password must be at least 6 characters";

    return null; // no errors
  };

  const handleSignup = async () => {
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4002/api/v1/user/signup",
        formData,
        {
          withCredentials: true,
        }
      );
      alert(data.message || "Signup Succeeded");
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.errors || "Signup Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#1e1e1e] text-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        <h1 className="text-white text-center text-2xl font-semibold mb-6">
          Signup
        </h1>

        {/* First Name */}
        <div className="mb-4">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password + Toggle */}
        <div className="mb-4 relative">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Terms */}
        <p className="text-xs text-gray-400 mb-6">
          By signing up or logging in, you consent to NeuroSync's{" "}
          <a className="underline" href="">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="underline" href="">
            Privacy Policy
          </a>
          .
        </p>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[#7a6ff6] hover:bg-[#6c61a6] text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Links */}
        <div className="flex justify-between mt-4 text-sm">
          <span className="text-gray-400">Already registered?</span>
          <Link className="text-[#7a6ff6] hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
