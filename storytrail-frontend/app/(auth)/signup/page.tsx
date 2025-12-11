"use client";

import React from "react";

export default function SignupPage() {
  const handleLogin = () => {
    // Redirect user to Supabase Google OAuth route
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up / Login</h1>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
