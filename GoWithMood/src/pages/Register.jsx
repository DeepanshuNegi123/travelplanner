import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useTrip } from "../context/TripContext";

const Register = () => {
  const { userId, setUserId, setUserData } = useTrip();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (userId) navigate("/profile");
  }, [userId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4002/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();
      console.log("🚀 Register response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      const newUserId = data.userId || data._id || data.user?._id;
      if (!newUserId) {
        throw new Error("No userId returned from server.");
      }

      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);

      // Fetch full user profile
      const userRes = await fetch(`http://localhost:4002/api/auth/user/${newUserId}`);
      const userInfo = await userRes.json();

      setUserData(userInfo);

      alert("Registration successful!");
      navigate("/profile");
    } catch (err) {
      console.error("❌ Registration error:", err.message);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-100 p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-orange-300">
          <div className="text-center mb-6">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-white" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Register</h2>
            <p className="text-gray-600">Create your account</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              icon={<User />}
              placeholder="Firstname"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              type="text"
            />
            <InputField
              icon={<User />}
              placeholder="Lastname"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              type="text"
            />
            <InputField
              icon={<Mail />}
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              type="email"
            />
            <PasswordField
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              show={showPassword}
              toggleShow={() => setShowPassword(!showPassword)}
              placeholder="Password"
            />
            <PasswordField
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              show={showConfirmPassword}
              toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Confirm Password"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-800 text-white font-semibold rounded-lg hover:from-amber-800 hover:to-amber-900 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <p className="text-center text-sm text-gray-700 mt-4">
              Already registered?{" "}
              <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
                Login
              </button>
            </p>
          </form>

          <footer className="text-center text-xs text-gray-500 mt-6">© 2024 – All Rights Reserved</footer>
        </div>
      </div>

      {/* Image panel */}
      <div className="flex-1 hidden lg:block">
        <img
          src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Travel Registration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

// Reusable input components
const InputField = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
    <input
      {...props}
      className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
  </div>
);

const PasswordField = ({ value, onChange, show, toggleShow, placeholder }) => (
  <div className="relative">
    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
      type={show ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-12 py-3 bg-gray-800 text-white rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
    <button
      type="button"
      onClick={toggleShow}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
    >
      {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>
);

export default Register;
