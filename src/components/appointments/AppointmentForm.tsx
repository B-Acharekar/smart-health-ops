'use client';

import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiX } from "react-icons/fi";

export default function AppointmentForm({
  date,
  time,
  onConfirm,
  onCancel,
}: {
  date: Date;
  time: string;
  onConfirm: (details: any) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [famName, setFamName] = useState("");
  const [famPhone, setFamPhone] = useState("");
  const [famEmail, setFamEmail] = useState("");
  const [reason, setReason] = useState("");
  const [doctor, setDoctor] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const doctors = [
    "Dr. Ananya Sharma",
    "Dr. Rajiv Patel",
    "Dr. Suman Gupta",
    "Dr. Neha Mehta",
  ];

  const fees = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor) {
      alert("Please select a doctor.");
      return;
    }
    onConfirm({
      name,
      phone,
      email,
      famName,
      famPhone,
      famEmail,
      reason,
      doctor,
      date,
      time,
    });
    setShowSuccess(true);
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-[rgba(255,255,255,0.15)] z-50"></div>

      <div className="fixed inset-0 z-50 flex flex-col items-center justify-start p-8 pt-16 overflow-y-auto">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-10 text-gray-900 font-sans">
          <button
            onClick={onCancel}
            className="absolute top-6 right-6 text-gray-600 hover:text-red-600 transition"
            aria-label="Close appointment form"
          >
            <FiX size={28} />
          </button>

          <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide text-blue-800 font-serif select-none">
            Smart Health Ops
          </h1>

          {showSuccess ? (
            <div className="text-center text-green-700 font-semibold text-lg">
              ✅ Appointment scheduled successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Full Name</label>
                  <div className="flex items-center border rounded px-3 py-2">
                    <FiUser className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Phone Number</label>
                  <div className="flex items-center border rounded px-3 py-2">
                    <span className="text-gray-600 mr-2">🇮🇳 +91</span>
                    <input
                      type="tel"
                      placeholder="Your phone number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Email Address</label>
                  <div className="flex items-center border rounded px-3 py-2">
                    <FiMail className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      placeholder="Your email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Family Member Name</label>
                  <div className="flex items-center border rounded px-3 py-2">
                    <FiUser className="text-gray-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Family member's full name"
                      value={famName}
                      onChange={(e) => setFamName(e.target.value)}
                      className="w-full outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Family Member Phone</label>
                  <div className="flex items-center border rounded px-3 py-2">
                    <span className="text-gray-600 mr-2">🇮🇳 +91</span>
                    <input
                      type="tel"
                      placeholder="Family member's phone number"
                      value={famPhone}
                      onChange={(e) => setFamPhone(e.target.value)}
                      className="w-full outline-none text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Family Member Email</label>
                  <div className="flex items-center border rounded px-3 py-2">
                    <FiMail className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      placeholder="Family member's email address"
                      value={famEmail}
                      onChange={(e) => setFamEmail(e.target.value)}
                      className="w-full outline-none text-gray-900"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Reason / Symptoms</label>
                <textarea
                  placeholder="Reason / Symptoms / Tags"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border rounded px-3 py-2 h-32 resize-none text-gray-900"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Select Doctor</label>
                <select
                  className="border rounded px-3 py-2 text-gray-900"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -- Choose a Doctor --
                  </option>
                  {doctors.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 text-right text-gray-700 font-semibold">
                Consultation Fees: ₹{fees}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Confirm Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
