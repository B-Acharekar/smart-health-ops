"use client";

import { useRouter } from "next/navigation";
import clock from "../assets/img/clock.png";
import AI from "../assets/img/artificial-intelligence.png";
import encrypted from "../assets/img/encrypted.png";

// Icon Components
const RealTimeIcon = () => (
  <img src={clock.src} alt="Real-time Monitoring" />
);

const BillingIcon = () => (
  <img src={AI.src} alt="AI Assistance" />
);

const SecureIcon = () => (
  <img src={encrypted.src} alt="Secure & Encrypted" />
);

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-50 px-6 py-4 flex items-center justify-between">
        <h1
          className="text-2xl font-extrabold text-blue-700 tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em' }}
        >
          Smart Health Ops
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/register")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
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
          <div className="flex flex-col items-center gap-3">
            <RealTimeIcon />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Real-Time Appointments</h3>
            <p className="text-gray-600">Book, reschedule, and notify patients instantly with live status updates.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <BillingIcon />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">AI-Powered Billing</h3>
            <p className="text-gray-600">Get automatic cost estimates and insurance code suggestions using ML.</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <SecureIcon />
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
