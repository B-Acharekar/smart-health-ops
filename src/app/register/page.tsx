"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [roleType, setRoleType] = useState<"Patient" | "Staff">("Patient");
  const [role, setRole] = useState<"Patient" | "Doctor" | "Admin">("Patient");


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try{
      const res = await fetch('/api/register',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: userName,email,password,role}),
      });

      const data = await res.json();

      if(!res.ok){
        alert(data.message || 'Registration failed');
      } else{
        alert('Registration successful! You can now Login.')
        router.push("/login");
      }
    } catch(error){
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
            "Built for those who heal. <br /> Powered by those who innovate."
          </h2>
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
          <div className="w-full max-w-md">
            {/* Toggle */}
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

            <h1 className="text-3xl font-bold text-blue-800 mb-2 text-center">Create Account</h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Join Smart Health Ops to manage your clinic smarter
            </p>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                />
              </div>

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
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                />
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
                Register
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Already have an account?{" "}
              <a href="/login" className="text-blue-700 font-semibold hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
