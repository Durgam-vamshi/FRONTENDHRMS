import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const RegisterOrg = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    adminName: '',
    email: '',
    password: '',
  });

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null); 

  const orgNameInputRef = useRef(null);

  useEffect(() => {
    if (orgNameInputRef.current) {
      orgNameInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null); 

    try {
<<<<<<< HEAD
      const API_URL = 'https://hrmsbackend-7.onrender.com/api/auth/register'; 
=======
      const API_URL = 'https://hrmsbackend-3.onrender.com/api/auth/register'; 
>>>>>>> f65b31dd0b5da4d8d5477c94806296f500ea634d
      
      const response = await axios.post(API_URL, formData);
      
      showMessage('success', "Registered successfully! You are now logged in (Token would normally be stored).");

      setFormData({ orgName: '', adminName: '', email: '', password: '' });

    } catch (err) {
      const errorMessage = err.response?.data?.error || "Registration failed. Check console for details.";
      console.error("Registration error:", err);
      showMessage('error', errorMessage);
    } finally {
      setBusy(false);
    }
  };

  const inputStyle = "w-full p-3 sm:p-4 mb-4 rounded-lg border border-[#007E6E] bg-white text-[#007E6E] placeholder-[#007E6E]/70 focus:ring-2 focus:ring-[#73AF6F] focus:border-transparent text-sm sm:text-base transition duration-150 ease-in-out shadow-inner";

  const messageClasses = message 
    ? (message.type === 'success' 
      ? "bg-green-100 border-green-400 text-green-700" 
      : "bg-red-100 border-red-400 text-red-700")
    : "";


  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#E7DEAF]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-full sm:max-w-md lg:max-w-lg bg-[#D7C097] p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl space-y-4"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#007E6E] text-center tracking-wide">
          Create Organization
        </h2>

        {message && (
          <div className={`p-3 rounded-lg border text-sm font-medium ${messageClasses}`}>
            {message.text}
          </div>
        )}

        <input
          ref={orgNameInputRef}
          placeholder="Organisation Name"
          type="text"
          name="orgName"
          value={formData.orgName}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <input
          placeholder="Admin Name"
          type="text"
          name="adminName"
          value={formData.adminName}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={inputStyle}
          required
        />

        <button
          type="submit"
          disabled={busy}
          className={`w-full p-3 sm:p-4 mt-6 rounded-xl text-white font-semibold shadow-lg transition duration-300 ease-in-out text-base sm:text-lg
            ${
              busy
                ? "bg-[#007E6E]/70 cursor-not-allowed transform hover:scale-100"
                : "bg-[#007E6E] hover:bg-[#73AF6F] hover:shadow-xl active:scale-[0.98]"
            }
          `}
        >
          {busy ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterOrg;
