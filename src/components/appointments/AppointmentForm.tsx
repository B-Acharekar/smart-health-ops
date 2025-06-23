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
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-opacity"></div>

      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8 pt-20 animate-fade-in">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-gray-900">
          {/* Close Button */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition"
            aria-label="Close appointment form"
          >
            <FiX size={26} />
          </button>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-10 text-blue-800 font-serif select-none">
            Smart Health Ops
          </h1>

          {/* Success Message */}
          {showSuccess ? (
            <div className="text-center text-green-700 text-lg font-semibold py-6">
              ✅ Appointment scheduled successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    label: "Full Name",
                    icon: <FiUser />,
                    value: name,
                    onChange: setName,
                    type: "text",
                    required: true,
                  },
                  {
                    label: "Phone Number",
                    icon: "+91",
                    value: phone,
                    onChange: setPhone,
                    type: "tel",
                    required: true,
                  },
                  {
                    label: "Email Address",
                    icon: <FiMail />,
                    value: email,
                    onChange: setEmail,
                    type: "email",
                    required: true,
                  },
                  {
                    label: "Family Member Name",
                    icon: <FiUser />,
                    value: famName,
                    onChange: setFamName,
                    type: "text",
                    required: false,
                  },
                  {
                    label: "Family Member Phone",
                    icon: "+91",
                    value: famPhone,
                    onChange: setFamPhone,
                    type: "tel",
                    required: false,
                  },
                  {
                    label: "Family Member Email",
                    icon: <FiMail />,
                    value: famEmail,
                    onChange: setFamEmail,
                    type: "email",
                    required: false,
                  },
                ].map(({ label, icon, value, onChange, type, required }, idx) => (
                  <div key={idx} className="flex flex-col">
                    <label className="mb-1 font-medium text-sm">{label}</label>
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
                      <span className="text-gray-400 mr-2">{icon}</span>
                      <input
                        type={type}
                        placeholder={label}
                        value={value}
                        required={required}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full outline-none bg-transparent text-gray-900"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Reason / Symptoms */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-sm">Reason / Symptoms</label>
                <textarea
                  placeholder="Reason / Symptoms / Tags"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  required
                ></textarea>
              </div>

              {/* Doctor Selection */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-sm">Select Doctor</label>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  required
                >
                  <option value="" disabled>-- Choose a Doctor --</option>
                  {doctors.map((doc) => (
                    <option key={doc} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fees Info */}
              <div className="text-right text-gray-700 font-medium">
                Consultation Fees: <span className="text-blue-700 font-semibold">₹{fees}</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
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
