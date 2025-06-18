"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b">
        <h1 className="text-2xl font-bold text-blue-700">Smart Health Ops</h1>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-24 px-6 bg-gradient-to-br from-blue-50 to-white">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Powering Clinics with <span className="text-blue-600">Smart Automation</span>
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-6">
          From appointment booking to billing & compliance — manage your entire clinic in one secure,
          real-time platform. Built for Indian healthcare teams.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Real-Time Appointments</h3>
            <p className="text-gray-600">Book, reschedule, and notify patients instantly with live status updates.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">AI-Powered Billing</h3>
            <p className="text-gray-600">Get automatic cost estimates and insurance code suggestions using ML.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Secure Communication</h3>
            <p className="text-gray-600">HIPAA-compliant chat and file sharing between doctors and patients.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 border-t text-sm">
        © {new Date().getFullYear()} Smart Health Ops. Built by Bhushan & Team.
      </footer>
    </main>
  );
}