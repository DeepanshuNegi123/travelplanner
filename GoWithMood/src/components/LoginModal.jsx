import React, { useState } from "react"
import { X } from "lucide-react"
import { useTrip } from "../context/TripContext"
import { Link } from "react-router-dom"

const LoginModal = () => {
  const { isLoginOpen, toggleLogin ,setUserId , userData , setUserData } = useTrip()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isLoginOpen) return null

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:4002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("✅ Login success:", data)
        localStorage.setItem("userId", data.userId)
        setUserId(data.userId);
       


const userRes = await fetch('http://localhost:4002/api/auth/user/' + data.userId);
const userInfo = await userRes.json();
setUserData(userInfo);

        toggleLogin(false)
      } else {
        console.warn("❌ Login failed:", data.message)
        setError(data.message)
      }


    }
    
    catch (err) {
      console.error("🔥 Server error:", err)
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
      setEmail("")
      setPassword("")
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => toggleLogin(false)}
      ></div>

      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={() => toggleLogin(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Log in</h2>
            <p className="text-gray-600">
              New user?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-medium"
                onClick={() => toggleLogin(false)}
              >
                Register Now
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm mt-4 text-center">{error}</div>
          )}

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 mt-6"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Privacy Policy */}
          <p className="text-xs text-gray-500 text-center mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            &{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Cookie Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
