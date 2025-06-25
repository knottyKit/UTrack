"use client";

import { useAuth, useLogin } from "./login.hooks";

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();
  const { login, logout, loginLoading } = useLogin();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Login Page</h1>

      {authLoading ? (
        <p>Checking authentication...</p>
      ) : user ? (
        <>
          <p className="mb-2">Signed in as: {user.displayName}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={login}
          disabled={loginLoading}
          className={`px-4 py-2 rounded text-white ${
            loginLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
        >
          {loginLoading ? "Signing In..." : "Sign In with Google"}
        </button>
      )}
    </div>
  );
}
