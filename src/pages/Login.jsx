


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#E7DEAF]">
      <form
        onSubmit={submit}
        className="w-full max-w-full sm:max-w-md md:max-w-lg bg-[#D7C097] p-4 sm:p-6 md:p-8 rounded-xl shadow-md"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#007E6E] text-center sm:text-left">
          Login
        </h2>

        {error && (
          <div className="text-red-700 mb-2 text-sm sm:text-base">{error}</div>
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 sm:p-4 mb-3 rounded border border-[#007E6E] bg-white text-[#007E6E] text-sm sm:text-base"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full p-3 sm:p-4 mb-3 rounded border border-[#007E6E] bg-white text-[#007E6E] text-sm sm:text-base"
        />

        <button className="w-full bg-[#007E6E] hover:bg-[#73AF6F] text-white p-3 sm:p-4 rounded transition-colors text-sm sm:text-base">
          Login
        </button>
      </form>

      <div className="mt-3 text-[#007E6E] text-sm sm:text-base text-center sm:text-left">
        Don’t have an account?{" "}
        <Link to="/register" className="text-[#004E45] font-semibold hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
}
