"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [roleType, setRoleType] = useState<"Patient" | "Staff">("Patient");
  const [role, setRole] = useState<"Patient" | "Doctor" | "Admin">("Patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Login failed');
      } else {
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("token", data.token);
        alert('Login successful!')
        router.push("/dashboard");
      }
    } catch (error) {
      alert('An error occured. Please try again.');
      console.error(error);
    }
  };

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-sky-300 via-sky-200 to-sky-100">
      <div className="flex w-full max-w-6xl mx-auto shadow-2xl rounded-3xl overflow-hidden my-10 bg-white">
        {/* Left Section: Quote */}
        <div className="hidden md:flex w-1/2 items-center justify-center px-10 py-12 bg-transparent">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight tracking-wide font-serif text-center">
            "Your health is an investment,<br /> not an expense."
          </h2>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
          <div className="w-full max-w-md">
            {/* Role Toggle */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex bg-gray-100 rounded-full p-1 w-56">
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${roleType === "Patient" ? "bg-blue-600 text-white shadow" : "text-gray-600"
                    }`}
                  onClick={() => {
                    setRoleType("Patient");
                    setRole("Patient");
                  }}
                >
                  Patient
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 ${roleType === "Staff" ? "bg-blue-600 text-white shadow" : "text-gray-600"
                    }`}
                  onClick={() => {
                    setRoleType("Staff");
                  }}
                >
                  Staff
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-blue-800 mb-2 text-center">Welcome Back</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Login to access Smart Health Ops
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>

                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <label className="inline-flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Remember me
                  </label>

                  <Link
                    href="/reset-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {roleType === "Staff" && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Select Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as "Doctor" | "Admin")}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                    required
                  >
                    <option value="">Select staff role</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-all"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Don’t have an account?{" "}
              <Link href="/register" className="text-blue-700 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
